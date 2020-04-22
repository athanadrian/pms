const mongoose = require('mongoose');
const validator = require('validator');

const RenterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add title'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['company', 'private', 'public']
    },
    percentage: {
      type: String,
      default: '100',
      trim: true,
      required: [true, 'Please add ownership percentage']
    },
    username: {
      type: String,
      trim: true,
      //required: [true, "Please add a user name"],
      maxlength: [32, 'Name can not exceed 32 characters']
    },
    firstname: {
      type: String,
      trim: true,
      maxlength: [32, 'Name can not exceed 32 characters']
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: [32, 'Name can not exceed 32 characters']
    },
    phone: {
      home: {
        type: Number,
        trim: true
      },
      mobile: {
        type: Number,
        trim: true
      }
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please add a valid email']
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please add a valid email"
      // ]
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        //required: true,
      }
    ],
    assets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Asset',
        unique: [true, 'Asset already exists'],
        required: true
      }
    ],
    asset: {
      type: mongoose.Schema.ObjectId,
      ref: 'Asset'
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

module.exports = mongoose.model('Renter', RenterSchema);
