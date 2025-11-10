require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

async function importJsonData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        logger.info('Connected to MongoDB successfully');

        // Read the JSON file
        const jsonFilePath = path.join(__dirname, '../data/products.json');
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const productsData = JSON.parse(jsonData);

        logger.info(`Read ${productsData.length} products from JSON file`);

        // Clear existing products
        await Product.deleteMany({});
        logger.info('Cleared existing products');

        // Transform the data to match our schema
        const transformedProducts = productsData.map(product => ({
            ...product,
            featured: product.featured === "true" || product.featured === true,
            shipping: product.shipping !== undefined ? product.shipping : true
        }));

        // Insert the new products
        const insertedProducts = await Product.insertMany(transformedProducts);
        logger.info(`Successfully imported ${insertedProducts.length} products`);

        // Close connection
        await mongoose.connection.close();
        logger.info('Database connection closed');

    } catch (error) {
        logger.error('Error importing JSON data:', error);
        process.exit(1);
    }
}

// Run the import if this file is executed directly
if (require.main === module) {
    importJsonData()
        .then(() => {
            logger.info('JSON data import completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            logger.error('JSON data import failed:', error);
            process.exit(1);
        });
}

module.exports = { importJsonData }; 