const express = require('express');

const router = express.Router({ mergeParams: true });
const Asset = require('../models/Asset');
const {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  getAssetStats
} = require('../controllers/assets');

const ownersRouter = require('../routes/owners');
const rentersRouter = require('../routes/renters');

router.use('/:assetId/owners', ownersRouter);
router.use('/:assetId/owners/:ownerId', ownersRouter);
router.use('/:assetId/renters', rentersRouter);
router.use('/:assetId/renters/:renterId', rentersRouter);

const { protect, authorize, setPropertyId } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect, authorize('admin'));

router.route('/asset-stats').get(getAssetStats);

router
  .route('/')
  .get(advancedResults(Asset), getAllAssets)
  .post(setPropertyId, createAsset);

router
  .route('/:id')
  .get(getAssetById)
  .patch(updateAsset)
  .delete(deleteAsset);

module.exports = router;
