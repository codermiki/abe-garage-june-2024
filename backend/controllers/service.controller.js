const serviceService = require("../services/service.service");

// create a service controller to handle the service requests
async function createService(req, res, next) {
   // console.log("Creating service with data:", req.body);
   try {
      const serviceData = req.body;
      const service = await serviceService.createService(serviceData);
      // console.log("Service created:", service);

      if (!service) {
         return res.status(400).json({
            error: "Failed to add the service!",
         });
      }

      res.status(200).json({
         status: "true",
      });
   } catch (err) {
      console.error("Error creating service:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the getAllServices controller
async function getAllServices(req, res, next) {
   try {
      const services = await serviceService.getAllServices();

      if (!services) {
         return res.status(400).json({
            error: "Failed to get all services!",
         });
      }

      res.status(200).json({
         status: "success",
         data: services,
      });
   } catch (err) {
      console.error("Error fetching services:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the getServiceById controller
async function getServiceById(req, res, next) {
   try {
      const serviceId = req.params.id;
      const service = await serviceService.getServiceById(serviceId);
      if (!service) {
         return res.status(400).json({
            error: "Failed to get the service!",
         });
      }

      res.status(200).json({
         status: "success",
         data: service,
      });
   } catch (err) {
      console.error("Error fetching service:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the updateService controller
async function updateService(req, res, next) {
   try {
      const serviceId = req.params.id;
      const serviceData = req.body;
      const service = await serviceService.updateService(
         serviceId,
         serviceData
      );
      if (!service) {
         return res.status(400).json({
            error: "Failed to update the service!",
         });
      }

      res.status(200).json({
         status: "success",
         data: service,
      });
   } catch (err) {
      console.error("Error updating service:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the deleteService controller
async function deleteService(req, res, next) {
   try {
      const serviceId = req.params.id;
      const isDeleted = await serviceService.deleteService(serviceId);
      if (!isDeleted) {
         return res.status(400).json({
            error: "Failed to delete the service!",
         });
      }

      res.status(200).json({
         status: "success",
         message: "Service deleted successfully!",
      });
   } catch (err) {
      console.error("Error deleting service:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}
// Export all the controllers
module.exports = {
   createService,
   getAllServices,
   getServiceById,
   updateService,
   deleteService,
};
