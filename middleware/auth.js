const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // 1) Check if token exists and get it
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new ErrorResponse('You are not logged in. You need to log in to get access.', 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new ErrorResponse('The user belonging to this token no longer exists.'),
      401
    );
  }
  // 4) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfterLogin(decoded.iat)) {
    return next(
      new ErrorResponse(
        'The user has recently changed password! You need to log in again.'
      ),
      401
    );
  }
  // Grand access to protect route
  req.user = currentUser;
  next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is inside authorization roles
    if (!roles.includes(req.user.role)) {
      console.log('role ', req.user.role);
      next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route.`,
          403
        )
      );
    }
    next();
  };
};

exports.setPropertyId = (req, res, next) => {
  if (!req.body.property) req.body.property = req.params.propertyId;
  next();
};
