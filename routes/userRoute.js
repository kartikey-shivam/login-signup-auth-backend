const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/password/forget').post(userController.forgotPassword);
router.route('/password/reset/:token').patch(userController.resetPassword);
router.route('/logout').post(userController.logoutUser);
router
  .route('/me')
  .get(authController.isAuthenticated, userController.getUserDetails);
router
  .route('/password/update')
  .patch(authController.isAuthenticated, userController.updatePassword);
router
  .route('/me/update')
  .patch(authController.isAuthenticated, userController.updateProfile);
router
  .route('/admin/users')
  .get(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    userController.getAllUsers
  );

router
  .route('/admin/user/:id')
  .get(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    userController.getSingleUser
  )
  .patch(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    userController.updateUser
  )
  .delete(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    userController.deleteUser
  );
module.exports = router;
