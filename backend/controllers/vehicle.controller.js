const serviceService = require("../services/vehicle.service");

// Create the addVehicle controller
const addVehicle = async (req, res) => {
   try {
      const vehicle = await serviceService.addVehicle(req.body);
      if (!vehicle) {
         return res.status(400).json({
            error: "Failed to add the service!",
         });
      }
      res.status(200).json({
         status: "true",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Create the getAllVehiclesOfCustomer controller
const getAllVehiclesOfCustomer = async (req, res) => {
   try {
      const customerId = req.params.customerId;
      const vehicles = await serviceService.getAllVehiclesOfCustomer(
         customerId
      );
      if (!vehicles) {
         return res.status(400).json({
            error: "Failed to get all vehicles!",
         });
      }
      res.status(200).json({
         status: "success",
         data: vehicles,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// exports
module.exports = {
   addVehicle,
   getAllVehiclesOfCustomer,
};
