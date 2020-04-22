const Rent = require('../models/Rent');
const {
  createDoc,
  getAllDocs,
  getSingleDoc,
  updateDoc,
  deleteDoc
} = require('./factory');

//@desc         Get all Rents
//@route        GET /api/v1/Rents
//@access       Private - Admin
exports.getAllRents = getAllDocs(Rent);

//@desc         Get Single Rent
//@route        GET /api/v1/Rents/:id
//@access       Private Admin
exports.getRentById = getSingleDoc(Rent);

//@desc         Create Rent
//@route        POST /api/v1/Rents
//@access       Private
exports.createRent = createDoc(Rent);

//@desc         Update Rent
//@route        PATCHE /api/v1/Rents/:id
//@access       Private
exports.updateRent = updateDoc(Rent);

//@desc         Delete Rent
//@route        DELETE /api/v1/Rents/:id
//@access       Private
exports.deleteRent = deleteDoc(Rent);
