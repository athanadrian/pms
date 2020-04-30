const express = require('express');

const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  registerByAuth,
  registerByGoogle,
  registerByFacebook,
  login,
  forgotPassword,
  resetPassword,
  updateUserPassword
} = require('../controllers/auth');

router.post('/google/register', registerByGoogle);
router.post('/facebook/register', registerByFacebook);
router.post('/register', registerByAuth);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);
router.patch('/update-user-password', protect, updateUserPassword);

module.exports = router;
