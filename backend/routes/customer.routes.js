// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the customer controller
// const employeeController = require('../controllers/employee.controller');
const customerController = require("../controllers/customer.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add employee request on post
// router.post("/api/employee", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
router.post(
   "/api/customer",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   customerController.createCustomer
);
// Create a route to handle the get all employees request on get

router.get(
   "/api/customer",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   customerController.getAllCustomers
);

// Create a route to handle the get customer by id request on get
router.get(
   "/api/customer/:id",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   customerController.getCustomerById
);

// Create a route to handle the update customer request on put
router.put(
   "/api/customer/:id",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   customerController.updateCustomer
);

// Create a route to handle search customer request on get
router.get(
   "/api/customer/search/:searchQuery",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   customerController.searchCustomer
);

// Export the router
module.exports = router;
