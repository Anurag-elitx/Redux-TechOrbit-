const { faker } = require('@faker-js/faker');
const logger = require('../utils/logger');

class ProductService {
  constructor() {
    this.brands = ['LG', 'Apple', 'Samsung', 'Vivo', 'OnePlus', 'Google', 'Motorola', 'ASUS', 'Xiaomi', 'Realme'];
    this.processors = [
      'Snapdragon 8 Gen 3', 'A17 Pro', 'Tensor G3', 'Dimensity 9300', 
      'Snapdragon 8+ Gen 1', 'A16 Bionic', 'Exynos 2400'
    ];
    this.colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Purple', 'Gold', 'Silver', 'Gray', 'Pink'];
  }

  generateProductId() {
    return faker.string.alphanumeric(8).toLowerCase();
  }

  generateProductName(brand) {
    const models = {
      'Apple': ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14'],
      'Samsung': ['Galaxy S24 Ultra', 'Galaxy S24', 'Galaxy A55', 'Galaxy Z Fold 5'],
      'OnePlus': ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord CE 4'],
      'Google': ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a'],
      'Xiaomi': ['Xiaomi 14 Ultra', 'Xiaomi 14', 'Redmi Note 13 Pro'],
      'Vivo': ['Vivo X100 Pro', 'Vivo V29', 'Vivo Y100'],
      'Motorola': ['Motorola Edge 40', 'Motorola G84', 'Motorola Razr 40'],
      'ASUS': ['ASUS Zenfone 11', 'ASUS ROG Phone 8', 'ASUS Zenfone 10'],
      'Realme': ['Realme GT Neo 5', 'Realme 12 Pro', 'Realme C67'],
      'LG': ['LG Wing', 'LG Velvet', 'LG G8']
    };
    
    return faker.helpers.arrayElement(models[brand] || ['Pro', 'Ultra', 'Plus', 'Lite']);
  }

  generateDisplay() {
    const size = faker.number.float({ min: 5.5, max: 7.2, precision: 0.1 });
    const types = ['AMOLED', 'OLED', 'LCD', 'IPS LCD', 'Super AMOLED'];
    const resolution = faker.helpers.arrayElement(['FHD+', 'QHD+', '4K']);
    return `${size}-inch ${faker.helpers.arrayElement(types)} ${resolution}`;
  }

  generateCamera() {
    const mainMP = faker.helpers.arrayElement([12, 16, 48, 50, 64, 108, 200]);
    const ultraWideMP = faker.helpers.arrayElement([8, 12, 13, 16, 48, 50]);
    const teleMP = faker.helpers.arrayElement([2, 5, 8, 12, 13, 50, 64]);
    
    return `${mainMP}MP Main + ${ultraWideMP}MP Ultra Wide + ${teleMP}MP Telephoto`;
  }

  generateBattery() {
    const capacity = faker.number.int({ min: 3000, max: 6000, step: 100 });
    return `${capacity}mAh`;
  }

  generateImages() {
    const imageCount = faker.number.int({ min: 1, max: 5 });
    const images = [];
    
    for (let i = 0; i < imageCount; i++) {
      images.push({
        id: faker.string.uuid(),
        url: faker.image.url({ width: 800, height: 600, category: 'technics' }),
        filename: `product_${faker.string.alphanumeric(8)}.jpg`,
        size: faker.number.int({ min: 100000, max: 5000000 }),
        type: 'image/jpeg',
        width: faker.number.int({ min: 800, max: 1920 }),
        height: faker.number.int({ min: 600, max: 1080 })
      });
    }
    
    return images;
  }

  generateProduct() {
    const brand = faker.helpers.arrayElement(this.brands);
    const model = this.generateProductName(brand);
    
    return {
      id: this.generateProductId(),
      brand,
      model,
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 199, max: 1499 }),
      colors: faker.helpers.arrayElements(this.colors, { min: 2, max: 4 }),
      shipping: faker.datatype.boolean({ probability: 0.8 }),
      display: this.generateDisplay(),
      featured: faker.datatype.boolean({ probability: 0.2 }),
      processor: faker.helpers.arrayElement(this.processors),
      ram: `${faker.number.int({ min: 4, max: 16 })}GB`,
      storage: `${faker.number.int({ min: 64, max: 1024, step: 64 })}GB`,
      camera: this.generateCamera(),
      battery: this.generateBattery(),
      image: faker.image.url({ width: 800, height: 600, category: 'technics' }),
      stock: faker.number.int({ min: 0, max: 100 }),
      reviews: faker.number.int({ min: 0, max: 500 }),
      stars: faker.number.float({ min: 3.0, max: 5.0, precision: 0.1 }),
      images: this.generateImages()
    };
  }

  async generateProducts(count) {
    const products = [];
    const usedIds = new Set();
    
    for (let i = 0; i < count; i++) {
      let product;
      let attempts = 0;
      
      // Ensure unique IDs
      do {
        product = this.generateProduct();
        attempts++;
      } while (usedIds.has(product.id) && attempts < 10);
      
      if (!usedIds.has(product.id)) {
        usedIds.add(product.id);
        products.push(product);
      }
    }
    
    logger.info(`Generated ${products.length} unique products`);
    return products;
  }
}

module.exports = ProductService; 