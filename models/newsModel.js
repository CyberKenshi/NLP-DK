const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
    thumbnail: { type: String, default: null },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }],
    content: { type: String, required: true },
    imageUrl: { type: String, default: null },
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
module.exports = News;