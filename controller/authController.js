const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookie;

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in first.', 401)
    );
  }
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    next(new AppError('The User belongs to the token does not exist.', 401));
  }

  if (currentUser.changedPasswordAfter(decodedToken.iat)) {
    return next(new AppError('User changed its password recently', 401));
  }

  req.user = currentUser;
  next();
});

exports.isAuthorized =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError('You are not allowed to perform this action.'),
        403
      );
    }
    next();
  };
