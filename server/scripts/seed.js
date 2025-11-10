require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const ProductService = require("../services/productService");
const { getConfig } = require("../config/database");
const logger = require("../utils/logger");
const { productSchema } = require("../middleware/productValidation");

class DatabaseSeeder {
  constructor() {
    this.config = getConfig();
    this.productService = new ProductService();
    this.batchSize = 50;
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      logger.info('Connected to MongoDB successfully');
    } catch (error) {
      logger.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      logger.info('Disconnected from MongoDB');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB:', error);
    }
  }

  async validateProducts(products) {
    const validProducts = [];
    const invalidProducts = [];

    for (const product of products) {
      const { error } = productSchema.validate(product);
      if (error) {
        invalidProducts.push({ product, error: error.details[0].message });
      } else {
        validProducts.push(product);
      }
    }

    if (invalidProducts.length > 0) {
      logger.warn(`Found ${invalidProducts.length} invalid products:`, invalidProducts);
    }

    return validProducts;
  }

  async insertBatch(batch) {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const result = await Product.insertMany(batch, { 
          ordered: false, // Continue on errors
          rawResult: true 
        });
        logger.info(`Batch inserted: ${result.insertedCount} products`);
        return result;
      } catch (error) {
        logger.error(`Batch insertion attempt ${attempt} failed:`, error.message);
        
        if (attempt === this.retryAttempts) {
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, this.retryDelay * attempt)
        );
      }
    }
  }

  async clearExistingData() {
    if (!this.config.clearExisting) {
      logger.info('Skipping data clearing as per configuration');
      return;
    }

    try {
      const count = await Product.countDocuments();
      if (count > 0) {
        await Product.deleteMany({});
        logger.info(`Cleared ${count} existing products`);
      } else {
        logger.info('No existing products to clear');
      }
    } catch (error) {
      logger.error('Error clearing existing data:', error);
      throw error;
    }
  }

  async seed() {
    const startTime = Date.now();
    
    try {
      logger.info('Starting database seeding process...');
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Configuration: ${JSON.stringify(this.config)}`);

      // Check if seeding is enabled
      if (!this.config.seedData) {
        logger.warn('Seeding is disabled for this environment');
        return;
      }

      // Connect to database
      await this.connect();

      // Clear existing data if configured
      await this.clearExistingData();

      // Check if data already exists
      const existingCount = await Product.countDocuments();
      if (existingCount > 0 && !this.config.clearExisting) {
        logger.warn(`Database already contains ${existingCount} products. Skipping seeding.`);
        return;
      }

      // Generate products
      logger.info(`Generating ${this.config.sampleDataCount} products...`);
      const products = await this.productService.generateProducts(this.config.sampleDataCount);

      // Validate products
      logger.info('Validating generated products...');
      const validProducts = await this.validateProducts(products);
      
      if (validProducts.length === 0) {
        throw new Error('No valid products generated');
      }

      // Insert products in batches
      logger.info(`Inserting ${validProducts.length} products in batches of ${this.batchSize}...`);
      
      for (let i = 0; i < validProducts.length; i += this.batchSize) {
        const batch = validProducts.slice(i, i + this.batchSize);
        await this.insertBatch(batch);
        
        const progress = Math.min(i + this.batchSize, validProducts.length);
        logger.info(`Progress: ${progress}/${validProducts.length} products processed`);
      }

      // Verify insertion
      const finalCount = await Product.countDocuments();
      logger.info(`Seeding completed. Total products in database: ${finalCount}`);

      const duration = Date.now() - startTime;
      logger.info(`Seeding process completed in ${duration}ms`);

    } catch (error) {
      logger.error('Database seeding failed:', error);
      throw error;
    } finally {
      await this.disconnect();
    }
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  const seeder = new DatabaseSeeder();
  
  seeder.seed()
    .then(() => {
      logger.info('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = DatabaseSeeder; 