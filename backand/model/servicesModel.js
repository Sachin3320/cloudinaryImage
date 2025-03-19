// src/models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // price: { type: String, required: true },
  // type: { type: String, required: true },
  // description: { type: String },
  // offerings: [String],
  bannerImage: { secure_url: {type: String}, public_id: {type: String} },
  images: [{ secure_url: {type: String}, public_id: {type: String} }],
  // top: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
