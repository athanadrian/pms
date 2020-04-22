const mongoose = require('mongoose');
//const Percentage = require('../models/Percentage');
//const Fee = require('../models/Fee');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add title'],
      unique: true,
      trim: true
    },
    configuration: {
      DEH: {
        type: String,
        trim: true
      },
      WATER: {
        type: String,
        trim: true
      },
      KAE: {
        type: String,
        trim: true
      }
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

//Reverse populate with virtuals fees
PropertySchema.virtual('payments', {
  ref: 'Payment',
  foreignField: 'property',
  localField: '_id',
  justOne: false
});

PropertySchema.pre(/^find/, function(next) {
  this.populate({
    path: 'payments',
    select: 'title'
  });
  next();
});

module.exports = mongoose.model('Property', PropertySchema);
