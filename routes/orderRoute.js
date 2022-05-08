const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

router
  .route('/order/new')
  .post(authController.isAuthenticated, orderController.createOrder);

router
  .route('/order/:id')
  .get(authController.isAuthenticated, orderController.getSingleOrder);
router
  .route('/order/me')
  .get(authController.isAuthenticated, orderController.myOrders);
router
  .route('/admin/orders')
  .get(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    orderController.getAllOrders
  );
router
  .route('/admin/order/:id')
  .patch(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    orderController.updateOrder
  )
  .delete(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    orderController.deleteOrder
  );
module.exports = router;
