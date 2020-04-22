const express = require('express');

const router = express.Router({ mergeParams: true });

const Renter = require('../models/Renter');
const {
  getAllRenters,
  getRenterById,
  updateRenter,
  deleteRenter,
  createNonExistingRenterForAsset,
  addExistingRenterToAsset
} = require('../controllers/renters');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect, authorize('admin'));

router
  .route('/')
  .get(advancedResults(Renter), getAllRenters)
  .post(createNonExistingRenterForAsset);

router
  .route('/:id')
  .get(getRenterById)
  .patch(updateRenter)
  .delete(deleteRenter);

router.put('/:renterId', addExistingRenterToAsset);

module.exports = router;
