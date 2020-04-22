const Renter = require('../models/Renter');
const Asset = require('../models/Asset');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');

const {
  createDoc,
  getAllDocs,
  getSingleDoc,
  updateDoc,
  deleteDoc
} = require('./factory');

exports.createNonExistingRenterForAsset = asyncHandler(async (req, res, next) => {
  let assets = [];
  let filter = {};

  if (req.params.assetId) {
    filter = { _id: req.params.assetId };
    assets = assets.push(req.params.assetId);
  } else if (req.body.asset) {
    filter = { _id: req.body.asset };
    assets = [...assets, req.body.asset];
  } else {
    assets = [];
  }
  req.body.assets = assets;

  const renter = await Renter.create(req.body);
  let asset;
  if (req.params.assetId || req.body.asset) {
    asset = await Asset.findByIdAndUpdate(
      filter,
      { $push: { renters: renter._id } },
      { new: true }
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: renter,
      asset
    }
  });
});

exports.addExistingRenterToAsset = asyncHandler(async (req, res, next) => {
  const renter = await Renter.find({ _id: req.params.renterId });
  if (renter[0].assets.includes(req.params.assetId)) {
    return next(new ErrorResponse('Renter already exists in the Asset.', 400));
  }
  const updatedRenter = await Renter.findByIdAndUpdate(
    { _id: req.params.renterId },
    { $push: { assets: req.params.assetId } },
    { new: true }
  );

  const asset = await Asset.findByIdAndUpdate(
    { _id: req.params.assetId },
    { $push: { renters: req.params.renterId } },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedRenter,
      asset
    }
  });
});

//@desc         Get all Renters
//@route        GET /api/v1/Renters
//@access       Private - Admin
exports.getAllRenters = getAllDocs(Renter);

//@desc         Get Single Renter
//@route        GET /api/v1/Renters/:id
//@access       Private Admin
exports.getRenterById = getSingleDoc(Renter);

//@desc         Create Renter
//@route        POST /api/v1/Renters
//@access       Private
exports.createRenter = createDoc(Renter);

//@desc         Update Renter
//@route        PATCHE /api/v1/Renters/:id
//@access       Private
exports.updateRenter = updateDoc(Renter);

//@desc         Delete Renter
//@route        DELETE /api/v1/Renters/:id
//@access       Private
exports.deleteRenter = deleteDoc(Renter);
