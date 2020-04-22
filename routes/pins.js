const express = require('express');

const router = express.Router();

const Pin = require('../models/Pin');
const {
  createPin,
  getAllPins,
  getPinById,
  updatePin,
  deletePin
} = require('../controllers/pins');
//***const propertyRouter = require('../routes/properties');
//***const feesRouter = require('../routes/fees');

//const { createProperty,getAllProperties } = require('../controllers/properties');
// router.post('/:assetId/properties', protect, authorize('admin'), createProperty);
// router.get('/:assetId/properties', protect, authorize('admin'), getAllProperties);
//***router.use('/:assetId/properties', propertyRouter);

// const { getAllFees } = require('../controllers/fees');
// router.get('/:assetId/fees', protect, authorize('admin'), getAllFees);
//***router.use('/:assetId/fees', feesRouter);

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect, authorize('admin'));

router
  .route('/')
  .get(advancedResults(Pin), getAllPins)
  .post(createPin);

router
  .route('/:id')
  .get(getPinById)
  .patch(updatePin)
  .delete(deletePin);

module.exports = router;
