const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true }, // Nội dung từ CKEditor
  imageUrl: { type: String, default: null }, // URL ảnh đại diện từ Cloudinary

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
module.exports = News;