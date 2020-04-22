const Owner = require('../models/Owner');
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

//@desc         Get all Owners
//@route        GET /api/v1/Owners
//@access       Private - Admin
exports.getAllOwners = getAllDocs(Owner);

//@desc         Get Single Owner
//@route        GET /api/v1/Owners/:id
//@access       Private Admin
exports.getOwnerById = getSingleDoc(Owner);

//@desc         Create Owner
//@route        POST /api/v1/Owners
//@access       Private
exports.createOwner = createDoc(Owner);

exports.createNonExistingOwnerForAsset = asyncHandler(async (req, res, next) => {
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

  const owner = await Owner.create(req.body);
  let asset;
  if (req.params.assetId || req.body.asset) {
    asset = await Asset.findByIdAndUpdate(
      filter,
      { $push: { owners: owner._id } },
      { new: true }
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: owner,
      asset
    }
  });
});

exports.addExistingOwnerToAsset = asyncHandler(async (req, res, next) => {
  const owner = await Owner.find({ _id: req.params.ownerId });
  console.log('owner', owner);
  if (owner[0].assets.includes(req.params.assetId)) {
    return next(new ErrorResponse('Already in the existing Assets', 400));
  }

  const updatedOwner = await Owner.findByIdAndUpdate(
    { _id: req.params.ownerId },
    { $push: { assets: req.params.assetId } },
    { new: true }
  );

  const asset = await Asset.findByIdAndUpdate(
    { _id: req.params.assetId },
    { $push: { owners: req.params.ownerId } },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedOwner,
      asset
    }
  });
});

//@desc         Update Owner
//@route        PATCHE /api/v1/Owners/:id
//@access       Private
exports.updateOwner = updateDoc(Owner);

//@desc         Delete Owner
//@route        DELETE /api/v1/Owners/:id
//@access       Private
exports.deleteOwner = deleteDoc(Owner);
