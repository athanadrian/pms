const mongoose = require('mongoose');
const slugify = require('slugify');

const PaymentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true
    },
    month: {
      type: String,
      required: [true, 'Please add month']
    },
    year: {
      type: String,
      required: [true, 'Please add year']
    },
    paymentRef: {
      type: String,
      unique: true,
      index: true
    },
    amount: {
      type: Number,
      default: 0,
      required: [true, 'Please add amount']
    },
    remarks: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    paidAt: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    renter: {
      type: mongoose.Schema.ObjectId,
      ref: 'Renter',
      required: true
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: true
    },
    asset: {
      type: mongoose.Schema.ObjectId,
      ref: 'Asset',
      required: true
    },
    rent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Rent'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

PaymentSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  this.paymentRef = `${this.month}-${this.year}`;
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
