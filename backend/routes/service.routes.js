// Import the express module
const express = require("express");

// Call the router method from express to create the router
const router = express.Router();

// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Import the service controller
const serviceController = require("../controllers/service.controller");

// Create a route to handle the add service request on post
router.post(
   "/api/service",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   serviceController.createService
);

// Create a route to handle the get all services request on get
router.get(
   "/api/service",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   serviceController.getAllServices
);

// Create a route to handle the get service by id request on get
router.get(
   "/api/service/:id",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   serviceController.getServiceById
);

// Create a route to handle the update service request on put
router.put(
   "/api/service/:id",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   serviceController.updateService
);

// Create a route to handle the delete service request on delete
router.delete(
   "/api/service/:id",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   serviceController.deleteService
);

// Export the router
module.exports = router;