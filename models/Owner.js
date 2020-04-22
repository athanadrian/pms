const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, 'Please add title'],
      // unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['company', 'private', 'public']
    },
    percentage: {
      type: String,
      trim: true,
      required: [true, 'Please add ownership percentage']
    },
    assets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Asset',
        unique: [true, 'Asset already exists'],
        required: true
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
      //required: true,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Owner', OwnerSchema);
