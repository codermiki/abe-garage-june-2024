const conn = require("../config/db.config");

// A function to create a new vehicle service
const addVehicle = async (vehicle) => {
   const sql =
      "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
   const values = [
      vehicle.customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
   ];
   const rows = await conn.query(sql, values);
   if (rows.affectedRows !== 1) {
      return false;
   }
   return true;
};

// A function to get all vehicles of a customer
const getAllVehiclesOfCustomer = async (customerId) => {
   const sql =
      "SELECT * FROM customer_vehicle_info WHERE customer_id = ? ORDER BY vehicle_year DESC";
   const values = [customerId];
   const rows = await conn.query(sql, values);
   if (rows.length === 0) {
      return false;
   }
   return rows;
};

// exports
module.exports = {
   addVehicle,
   getAllVehiclesOfCustomer,
};
