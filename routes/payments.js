const express = require('express');

const router = express.Router();

const Payment = require('../models/Payment');
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} = require('../controllers/payments');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect, authorize('admin'));

router
  .route('/')
  .get(advancedResults(Payment), getAllPayments)
  .post(createPayment);

router
  .route('/:id')
  .get(getPaymentById)
  .patch(updatePayment)
  .delete(deletePayment);

module.exports = router;
