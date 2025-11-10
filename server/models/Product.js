const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
      enum: {
        values: [
          "LG",
          "Apple",
          "Samsung",
          "Vivo",
          "OnePlus",
          "Google",
          "Motorola",
          "ASUS",
          "Xiaomi",
          "Realme",
        ],
        message: `{value} is not supported`,
      },
    },
    model: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
    display: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    processor: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    camera: {
      type: String,
      required: true,
    },
    battery: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://live.staticflickr.com/65535/52752717011_dbaa45852a_w.jpg",
    },
    stock: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    images: [
      {
        id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
        },
        filename: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
