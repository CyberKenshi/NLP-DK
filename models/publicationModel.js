const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
    trim: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  abstract: {
    type: String,
    default: null,
    trim: true,
  },
  keywords: {
    type: [String],
    default: null,
  },
  doi: {
    type: String,
    default: null,
    trim: true,
    unique: true,
  },
  journal: {
    type: String,
    default: null,
    trim: true,
  },
  volume: {
    type: String,
    default: null,
  },
  issue: {
    type: String,
    default: null,
  },
  pages: {
    type: String,
    default: null,
  },
  publisher: {
    type: String,
    default: null,
    trim: true,
  },
  link: {
    type: String,
    default: null,
    trim: true,
  },
  type: {
    type: String,
    enum: ['journal_article', 'conference_paper', 'book_chapter', 'review'],
    default: 'journal_article',
  },
  status: {
    type: String,
    enum: ['published', 'under_review', 'retracted'],
    default: 'published',
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
  is_deleted: {
    type: Boolean,
    default: false,
  },
  accessType: {
    type: String,
    enum: ['open_access', 'subscription'],
    default: 'subscription',
  },
  citationCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

publicationSchema.index({ publicationDate: 1 });
publicationSchema.index({ is_deleted: 1 });

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;