import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
