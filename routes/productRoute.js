const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/products').get(productController.getAllProducts);
router
  .route('/product/new')
  .post(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    productController.createProduct
  );
router
  .route('/product/:id')
  .patch(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    productController.updateProduct
  )
  .get(productController.getProduct)
  .delete(
    authController.isAuthenticated,
    authController.isAuthorized('Admin'),
    productController.deleteProduct
  );
router
  .route('/review')
  .post(authController.isAuthenticated, productController.createProductReview);
router
  .route('/reviews')
  .get(productController.getProductReviews)
  .delete(
    authController.isAuthenticated,
    productController.deleteProductReviews
  );
module.exports = router;
