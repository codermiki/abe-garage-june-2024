const conn = require("../config/db.config");
const crypto = require("crypto");

// A function to create a new order
const addOrder = async (orderData) => {
   try {
      const order_hash = crypto.randomUUID(); // or generate something custom
      const sql = `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash)
       VALUES (?, ?, ?, ?, ?)`;
      const values = [
         orderData.employee_id,
         orderData.customer_id,
         orderData.vehicle_id,
         true, // active_order
         order_hash,
      ];
      const result = await conn.query(sql, values);
      if (result.affectedRows === 0) {
         console.error("Failed to create order:", result);
         return false;
      } else {
         const orderId = result.insertId;
         const serviceValues = orderData.order_service.map(({ service_id }) => [
            orderId,
            service_id,
            false,
         ]);
         serviceValues.forEach((serviceValue) => {
            const sql2 = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)`;
            conn.query(sql2, serviceValue);
         });

         const sql3 = `INSERT INTO order_status (order_id,order_status) VALUES (?, ?)`;
         await conn.query(sql3, [orderId, 0]);

         return true;
      }
   } catch (error) {
      console.error("Error creating order:", error);
      return false;
   }
};

// A function to get all orders of a customer
const getAllOrdersOfCustomer = async (customerId) => {
   try {
      const sql =
         "SELECT * FROM orders WHERE customer_id = ? ORDER BY order_date DESC";
      const values = [customerId];
      const rows = await conn.query(sql, values);
      return rows;
   } catch (error) {
      console.error("Error fetching orders:", error);
      return false;
   }
};

// A function to get all orders
const getAllOrders = async () => {
   try {
      const sql = `SELECT 
      o.order_id,
      o.order_date,
      e.employee_first_name,
      e.employee_last_name,
      s.order_status,

      ci.customer_id,
      ci.customer_first_name,
      ci.customer_last_name,
      cid.customer_email,
      cid.customer_phone_number,

      v.vehicle_id,
      v.vehicle_make,
      v.vehicle_model,
      v.vehicle_year,
      v.vehicle_serial

    FROM orders o
    JOIN customer_info ci ON o.customer_id = ci.customer_id
    JOIN customer_identifier cid ON ci.customer_id = cid.customer_id
    JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
    JOIN employee_info e ON o.employee_id = e.employee_id
    JOIN order_status s ON o.order_id = s.order_id
    ORDER BY o.order_id DESC`;

      const rows = await conn.query(sql);
      return rows;
   } catch (error) {
      console.error("Error fetching orders:", error);
      return false;
   }
};

// exports
module.exports = {
   addOrder,
   getAllOrdersOfCustomer,
   getAllOrders,
};
