const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductsSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  barcode: {
    type: Number,
    required: true
  },
  category_name: {
    type: String,
    required: true
  },
  image:
  {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
});

module.exports = Products = mongoose.model("products", ProductsSchema);