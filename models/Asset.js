const mongoose = require('mongoose');
//const Property = require('../models/Property');

const AssetSchema = new mongoose.Schema(
  {
    code: {
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
    setup: {
      rooms: {
        type: Number,
        trim: true
      },
      bathrooms: {
        type: Number,
        trim: true
      },
      hasExtraSpace: {
        type: Boolean
      },
      sqMeters: {
        type: Number,
        default: 0,
        trim: true
      },
      extraSpaceSqMeters: {
        type: Number,
        default: 0,
        trim: true
      }
    },
    debt: {
      type: Number,
      default: 0
    },
    description: String,
    feesTotal: {
      type: Number,
      default: 0
    },
    feesAverage: {
      type: Number,
      default: 0
    },
    feesQuantity: {
      type: Number,
      default: 0
    },
    expensesTotal: {
      type: Number,
      default: 0
    },
    expensesAverage: {
      type: Number,
      default: 0
    },
    expensesQuantity: {
      type: Number,
      default: 0
    },
    feePaymentsTotal: {
      type: Number,
      default: 0
    },
    feePaymentsAverage: {
      type: Number,
      default: 0
    },
    feePaymentsQuantity: {
      type: Number,
      default: 0
    },
    rentPaymentsTotal: {
      type: Number,
      default: 0
    },
    rentPaymentsAverage: {
      type: Number,
      default: 0
    },
    rentPaymentsQuantity: {
      type: Number,
      default: 0
    },
    pin: {
      type: mongoose.Schema.ObjectId,
      ref: 'Pin'
    },
    rent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Rent'
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: true
    },
    owners: [
      {
        type: mongoose.Schema.ObjectId,
        unique: [true, 'Owner already exists'],
        ref: 'Owner'
      }
    ],
    renters: [
      {
        type: mongoose.Schema.ObjectId,
        unique: [true, 'Renter already exists'],
        ref: 'Renter'
      }
    ],
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        //required: true,
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

AssetSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'rent',
    select: 'amount'
  })
    .populate({
      path: 'owners',
      select: 'title percentage'
    })
    .populate({
      path: 'renters',
      select: 'title percentage category'
    });
  next();
});

module.exports = mongoose.model('Asset', AssetSchema);
