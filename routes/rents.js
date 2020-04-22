const express = require('express');

const router = express.Router();

const Rent = require('../models/Rent');
const {
  createRent,
  getAllRents,
  getRentById,
  updateRent,
  deleteRent
} = require('../controllers/rents');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect, authorize('admin'));

router
  .route('/')
  .get(advancedResults(Rent), getAllRents)
  .post(createRent);

router
  .route('/:id')
  .get(getRentById)
  .patch(updateRent)
  .delete(deleteRent);

module.exports = router;
