// Import the express module
const express = require("express");

// Call the router method from express to create the router
const router = express.Router();

// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");

// Create a route to handle the add vehicle request on post
router.post(
   "/api/vehicle",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   vehicleController.addVehicle
);
// create a route to handle the get all vehicles of single customer request on get
router.get(
   "/api/vehicles/customer/:customerId",
   [authMiddleware.verifyToken, authMiddleware.isAdmin],
   vehicleController.getAllVehiclesOfCustomer
);

// // Create a route to handle the get all vehicles request on get
// router.get(
//     "/api/vehicle",
//     [authMiddleware.verifyToken, authMiddleware.isAdmin],
//     vehicleController.getAllVehicles
// );

// // Create a route to handle the get vehicle by id request on get
// router.get(
//     "/api/vehicle/:id",
//     [authMiddleware.verifyToken, authMiddleware.isAdmin],
//     vehicleController.getVehicleById
// );

// // Create a route to handle the update vehicle request on put
// router.put(
//     "/api/vehicle/:id",
//     [authMiddleware.verifyToken, authMiddleware.isAdmin],
//     vehicleController.updateVehicle
// );

// // Create a route to handle the delete vehicle request on delete
// router.delete(
//     "/api/vehicle/:id",
//     [authMiddleware.verifyToken, authMiddleware.isAdmin],
//     vehicleController.deleteVehicle
// );

// Export the router
module.exports = router;
