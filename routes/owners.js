const express = require('express');

const router = express.Router({ mergeParams: true });

const Owner = require('../models/Owner');
const {
  //createOwner,
  getAllOwners,
  getOwnerById,
  updateOwner,
  deleteOwner,
  createNonExistingOwnerForAsset,
  addExistingOwnerToAsset
} = require('../controllers/owners');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect, authorize('admin'));

router
  .route('/')
  .get(advancedResults(Owner), getAllOwners)
  .post(createNonExistingOwnerForAsset);

router
  .route('/:id')
  .get(getOwnerById)
  .patch(updateOwner)
  .delete(deleteOwner);

router.put('/:ownerId', addExistingOwnerToAsset);

module.exports = router;
