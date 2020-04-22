const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const PinSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: [
        'land',
        'building',
        'apartment',
        'office',
        'warehouse',
        'maisonette',
        'complex'
      ]
    },
    pinIcon: {
      type: String
    },
    image: {
      type: String
    },
    latitude: {
      type: Number,
      trim: true
    },
    longitude: {
      type: Number,
      trim: true
    },
    address: {
      type: String
      //required: [true, 'Please add an address']
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
    slug: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
      //required: true,
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property'
    }
  },
  { timestamps: true }
);

PinSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

//Geocode & create location
PinSchema.pre('save', async function(next) {
  let loc;
  if (this.address) {
    loc = await geocoder.geocode(this.address);
  } else {
    loc = await geocoder.reverse({ lat: this.latitude, lon: this.longitude });
  }
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Pin', PinSchema);
