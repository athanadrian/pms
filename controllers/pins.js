const Pin = require('../models/Pin');
const {
  createDoc,
  getAllDocs,
  getSingleDoc,
  updateDoc,
  deleteDoc
} = require('./factory');

//@desc         Get all Pins
//@route        GET /api/v1/Pins
//@access       Private - Admin
exports.getAllPins = getAllDocs(Pin);

//@desc         Get Single Pin
//@route        GET /api/v1/pins/:id
//@access       Private Admin
exports.getPinById = getSingleDoc(Pin);

//@desc         Create Pin
//@route        POST /api/v1/pins
//@access       Private
exports.createPin = createDoc(Pin);

//@desc         Update Pin
//@route        PATCHE /api/v1/pins/:id
//@access       Private
exports.updatePin = updateDoc(Pin);

//@desc         Delete Pin
//@route        DELETE /api/v1/pins/:id
//@access       Private
exports.deletePin = deleteDoc(Pin);
