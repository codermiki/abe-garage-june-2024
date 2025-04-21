// Import the express module
const express = require("express");

// Call the router method from express to create the router
const router = express.Router();

// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Import the vehicle controller
const orderController = require("../controllers/order.controller");

// Create a route to handle the add vehicle request on post
// Create a route to handle the add order request on post
router.post(
   "/api/order",
   [authMiddleware.verifyToken],
   orderController.addOrder
);

// Create a route to handle the get all orders of a single customer request on get
router.get(
   "/api/orders/customer/:customerId",
   [authMiddleware.verifyToken],
   orderController.getAllOrdersOfCustomer
);

// Create a route to handle the get all orders request on get
router.get(
   "/api/orders",
   [authMiddleware.verifyToken],
   orderController.getAllOrders
);

// // Create a route to handle the get order by id request on get
// router.get(
//    "/api/order/:id",
//    [authMiddleware.verifyToken],
//    orderController.getOrderById
// );

// // Create a route to handle the update order request on put
// router.put(
//    "/api/order/:id",
//    [authMiddleware.verifyToken],
//    orderController.updateOrder
// );

// // Create a route to handle the delete order request on delete
// router.delete(
//    "/api/order/:id",
//    [authMiddleware.verifyToken],
//    orderController.deleteOrder
// );

// Export the router
module.exports = router;
