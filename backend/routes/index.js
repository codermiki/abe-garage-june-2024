// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");
// Import the login routes
const customerRouter = require("./customer.routes");
// Import the service routes
const serviceRouter = require("./service.routes");
// Import the service routes
const vehicleRouter = require("./vehicle.routes");
// Import the order routes
const orderRouter = require("./order.routes");
// Import the login routes
const loginRoutes = require("./login.routes");

// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the employee routes to the main router
router.use(customerRouter);
// Add the service routes to the main router
router.use(serviceRouter);
// Add the vehicle routes to the main router
router.use(vehicleRouter);
// Add the vehicle routes to the main router
router.use(orderRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Export the router
module.exports = router;
