const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    upgradePercentage: {
      type: Number,
      default: 0
    },
    remarks: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    upgradeAt: {
      type: Date
    },
    startedAt: {
      type: Date
    },
    endedAt: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
      //required: true,
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model('Rent', RentSchema);
