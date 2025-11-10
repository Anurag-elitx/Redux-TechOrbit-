const Joi = require('joi');

const productSchema = Joi.object({
  id: Joi.string().required().min(3).max(50),
  brand: Joi.string().valid(
    'LG', 'Apple', 'Samsung', 'Vivo', 'OnePlus', 
    'Google', 'Motorola', 'ASUS', 'Xiaomi', 'Realme'
  ).required(),
  model: Joi.string().required().min(2).max(100),
  description: Joi.string().required().min(10).max(1000),
  price: Joi.number().positive().max(10000).required(),
  colors: Joi.array().items(Joi.string()).min(1).required(),
  shipping: Joi.boolean().default(false),
  display: Joi.string().required().min(5).max(200),
  featured: Joi.boolean().default(false),
  processor: Joi.string().required().min(3).max(100),
  ram: Joi.string().required().min(2).max(20),
  storage: Joi.string().required().min(2).max(20),
  camera: Joi.string().required().min(5).max(200),
  battery: Joi.string().required().min(5).max(50),
  image: Joi.string().uri().required(),
  stock: Joi.number().integer().min(0).max(1000).required(),
  reviews: Joi.number().integer().min(0).max(10000).required(),
  stars: Joi.number().min(0).max(5).precision(1).required(),
  images: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      url: Joi.string().uri(),
      filename: Joi.string().required(),
      size: Joi.number().positive().required(),
      type: Joi.string().required(),
      width: Joi.number().positive().required(),
      height: Joi.number().positive().required()
    })
  ).min(1).required()
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false, 
      error: error.details[0].message 
    });
  }
  next();
};

module.exports = { validateProduct, productSchema }; 