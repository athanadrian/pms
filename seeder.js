const fs = require('fs');
const dotenv = require('dotenv');
require('colors');

const connectDB = require('./config/db');

// Get env variables
dotenv.config({ path: './config/config.env' });

// Get models
const Pin = require('./models/Pin');
const User = require('./models/User');
const Property = require('./models/Property');
const Asset = require('./models/Asset');
const Renter = require('./models/Renter');
const Rent = require('./models/Rent');

// Connect to DB
connectDB();

// Read JSON files
const pins = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/new_data/pins.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/new_data/users.json`, 'utf-8')
);
const properties = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/new_data/properties.json`, 'utf-8')
);
const assets = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/new_data/assets.json`, 'utf-8')
);
const rents = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/new_data/rents.json`, 'utf-8')
);
const renters = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/new_data/renters.json`, 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    await Pin.create(pins);
    await User.create(users);
    await Property.create(properties);
    await Asset.create(assets);
    await Renter.create(renters);
    await Rent.create(rents);

    console.log('Data imported....'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Pin.deleteMany();
    await User.deleteMany();
    await Property.deleteMany();
    await Asset.deleteMany();
    await Renter.deleteMany();
    await Rent.deleteMany();

    console.log('Data deleted....'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
