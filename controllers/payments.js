const Payment = require('../models/Payment');
const {
  createDoc,
  getAllDocs,
  getSingleDoc,
  updateDoc,
  deleteDoc
} = require('./factory');

//@desc         Get all Payments
//@route        GET /api/v1/Payments
//@access       Private - Admin
exports.getAllPayments = getAllDocs(Payment);

//@desc         Get Single Payment
//@route        GET /api/v1/Payments/:id
//@access       Private Admin
exports.getPaymentById = getSingleDoc(Payment);

//@desc         Create Payment
//@route        POST /api/v1/Payments
//@access       Private
exports.createPayment = createDoc(Payment);

//@desc         Update Payment
//@route        PATCHE /api/v1/Payments/:id
//@access       Private
exports.updatePayment = updateDoc(Payment);

//@desc         Delete Payment
//@route        DELETE /api/v1/Payments/:id
//@access       Private
exports.deletePayment = deleteDoc(Payment);
