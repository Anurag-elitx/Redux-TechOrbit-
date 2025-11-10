const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const ProductService = require("../services/productService");
const { validateProduct } = require("../middleware/productValidation");
const logger = require("../utils/logger");
const router = require("express").Router();

// Admin-only seeding endpoint
router.post("/seed-products", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { count = 10, clearExisting = false } = req.body;
    
    logger.info(`Admin seeding request: ${count} products, clearExisting: ${clearExisting}`);
    
    if (clearExisting) {
      await Product.deleteMany({});
      logger.info('Cleared existing products');
    }
    
    const productService = new ProductService();
    const products = await productService.generateProducts(count);
    
    const insertedProducts = await Product.insertMany(products);
    
    logger.info(`Admin seeding completed: ${insertedProducts.length} products added`);
    
    res.status(200).json({
      success: true,
      message: `Successfully seeded ${insertedProducts.length} products`,
      count: insertedProducts.length
    });
  } catch (error) {
    logger.error('Admin seeding failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get database statistics
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const featuredProducts = await Product.countDocuments({ featured: true });
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    
    const brandStats = await Product.aggregate([
      {
        $group: {
          _id: "$brand",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        featuredProducts,
        lowStockProducts,
        outOfStockProducts,
        brandStats
      }
    });
  } catch (error) {
    logger.error('Failed to get stats:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Bulk delete products
router.delete("/products", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        error: 'Product IDs array is required'
      });
    }
    
    const result = await Product.deleteMany({ _id: { $in: ids } });
    
    logger.info(`Admin bulk delete: ${result.deletedCount} products deleted`);
    
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} products`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    logger.error('Bulk delete failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Update product stock
router.patch("/products/:id/stock", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { stock } = req.body;
    
    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid stock number is required'
      });
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    logger.info(`Stock updated for product ${req.params.id}: ${stock}`);
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    logger.error('Stock update failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get low stock products
router.get("/products/low-stock", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { threshold = 10 } = req.query;
    
    const lowStockProducts = await Product.find({ 
      stock: { $lt: parseInt(threshold) } 
    }).select('id brand model stock price');
    
    res.status(200).json({
      success: true,
      products: lowStockProducts,
      count: lowStockProducts.length
    });
  } catch (error) {
    logger.error('Failed to get low stock products:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Bulk update product prices
router.patch("/products/bulk-price", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        error: 'Products array with id and price is required'
      });
    }
    
    let updatedCount = 0;
    
    for (const { id, price } of products) {
      if (typeof price === 'number' && price > 0) {
        const result = await Product.findByIdAndUpdate(id, { price }, { new: true });
        if (result) updatedCount++;
      }
    }
    
    logger.info(`Bulk price update: ${updatedCount} products updated`);
    
    res.status(200).json({
      success: true,
      message: `Updated prices for ${updatedCount} products`,
      updatedCount
    });
  } catch (error) {
    logger.error('Bulk price update failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router; 