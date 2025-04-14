const conn = require("../config/db.config");

// A function to create a new service
async function createService(service) {
   const query =
      "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
   const rows = await conn.query(query, [
      service.service_name,
      service.service_description,
   ]);
   if (rows.affectedRows !== 1) {
      return false;
   }
   return true;
}

// A function to get all services
async function getAllServices() {
   const query = "SELECT * FROM common_services";
   const rows = await conn.query(query);
   if (rows.length === 0) {
      return false;
   }
   return rows;
}

// A function to get a service by id
async function getServiceById(serviceId) {
   const query = "SELECT * FROM common_services WHERE service_id = ?";
   const rows = await conn.query(query, [serviceId]);
   if (rows.length === 0) {
      return false;
   }
   return rows[0];
}

// A function to update a service by id
async function updateService(serviceId, service) {
   const query =
      "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";
   const rows = await conn.query(query, [
      service.service_name,
      service.service_description,
      serviceId,
   ]);
   if (rows.affectedRows !== 1) {
      return false;
   }
   return true;
}

// A function to delete a service by id
async function deleteService(serviceId) {
   const query = "DELETE FROM common_services WHERE service_id = ?";
   const rows = await conn.query(query, [serviceId]);
   if (rows.affectedRows !== 1) {
      return false;
   }
   return true;
}

// Export the functions for use in the controller
module.exports = {
   createService,
   getAllServices,
   getServiceById,
   updateService,
   deleteService,
};
