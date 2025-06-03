const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  journal: {
    type: String,
    default: null,
    trim: true,
  },
  link: {
    type: String,
    default: null,
    trim: true,
  },
  authors: {
    type: [String],
    default: [],
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  citationCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

publicationSchema.index({ publicationDate: 1 });
publicationSchema.index({ is_deleted: 1 });

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;