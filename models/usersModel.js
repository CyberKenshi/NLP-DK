const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, trim: true },
  mobile: { type: String, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },

  jobTitles: [{
    vi: { type: String, required: true, trim: true, default: null },
    en: { type: String, required: true, trim: true, default: null }
  }, { _id: false }],
  degree: {
    vi: {
      type: String,
      enum: ['ThS.', 'TS.', 'GS', 'PGS.TS.'],
      default: null
    },
    en: {
      type: String,
      enum: ['BSc.', 'MSc.', 'PhD.', 'Prof.', 'Assoc. Prof.'],
      default: null
    }
  },

  role: {
    type: String,
    enum: ['admin', 'personnel', 'intern', 'colab'],
    required: true,
    default: 'intern'
  },

  bio: { type: String, default: null },
  supervisor_personnel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  major: { type: String, default: null },
  school: { type: String, default: null },
  avatar: { type: String, default: null },
  expertise: { type: [String], default: null },
  scholarID: { type: String, default: null },
  isLocked: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.virtual('userId').get(function () {
  return this._id;
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    ret.createdAt = moment(ret.createdAt).format('DD/MM/YYYY HH:mm:ss');
    ret.updatedAt = moment(ret.updatedAt).format('DD/MM/YYYY HH:mm:ss');
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
