const conn = require("../config/db.config");
const bcrypt = require("bcrypt");

async function checkIfCustomerExists(email) {
   const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
   const rows = await conn.query(query, [email]);
   return rows.length > 0;
}

async function createCustomer(customer) {
   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
         customer.customer_password,
         salt
      );

      const query =
         "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
      const rows = await conn.query(query, [
         customer.customer_email,
         customer.customer_phone_number,
         hashedPassword,
      ]);

      if (rows.affectedRows !== 1) {
         return false;
      }

      const customer_id = rows.insertId;

      const query2 =
         "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
      await conn.query(query2, [
         customer_id,
         customer.customer_first_name,
         customer.customer_last_name,
         customer.active_customer_status,
      ]);

      return { customer_id };
   } catch (err) {
      console.error("Error creating customer:", err);
      return {};
   }
}

async function getCustomerByEmail(customer_email) {
   const query = `
      SELECT * FROM customer_identifier 
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
      WHERE customer_identifier.customer_email = ?`;
   return await conn.query(query, [customer_email]);
}

async function getAllCustomers() {
   try {
      const query = `
         SELECT ci.customer_id, ci.customer_email, ci.customer_phone_number, ci.customer_hash, ci.customer_added_date, 
                cii.customer_first_name, cii.customer_last_name, cii.active_customer_status 
         FROM customer_identifier ci 
         JOIN customer_info cii ON ci.customer_id = cii.customer_id`;
      const rows = await conn.query(query);

      return {
         limit: 10,
         customers: rows.map((row) => ({
            customer_id: row.customer_id,
            customer_email: row.customer_email,
            customer_phone_number: row.customer_phone_number,
            customer_first_name: row.customer_first_name,
            customer_last_name: row.customer_last_name,
            customer_hash: row.customer_hash,
            active_customer_status: row.active_customer_status,
            customer_added_date: row.customer_added_date,
         })),
      };
   } catch (err) {
      console.error("Error fetching customers:", err);
      return { limit: 10, customers: [] };
   }
}

async function getCustomerById(id) {
   const query = `
      SELECT * FROM customer_identifier 
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
      WHERE customer_identifier.customer_id = ?`;
   return await conn.query(query, [id]);
}

async function updateCustomer(id, customer) {
   try {
      const {
         customer_email,
         customer_phone_number,
         customer_first_name,
         customer_last_name,
         active_customer_status,
      } = customer;

      const existingCustomer = await getCustomerById(id);
      if (!existingCustomer) return false;

      const existingEmail = await getCustomerByEmail(customer_email);
      if (!existingEmail || existingEmail[0]?.customer_id != id) return false;

      if (
         customer_phone_number === undefined ||
         customer_first_name === undefined ||
         customer_last_name === undefined ||
         active_customer_status === undefined
      ) {
         return false;
      }

      const query1 =
         "UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?";
      await conn.query(query1, [customer_phone_number, id]);

      const query2 =
         "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?";
      await conn.query(query2, [
         customer_first_name,
         customer_last_name,
         active_customer_status,
         id,
      ]);

      return true;
   } catch (err) {
      console.error("Error updating customer:", err);
      return false;
   }
}

// A function to search for a customer by name or email or phone number
async function searchCustomer(searchQuery) {
   const query = `
      SELECT * FROM customer_identifier 
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
      WHERE customer_identifier.customer_email LIKE ? OR 
            customer_info.customer_first_name LIKE ? OR 
            customer_identifier.customer_phone_number LIKE ? OR 
            customer_info.customer_last_name LIKE ?`;
   const rows = await conn.query(query, [
      `%${searchQuery}%`,
      `%${searchQuery}%`,
      `%${searchQuery}%`,
      `%${searchQuery}%`,
   ]);
   return rows;
}

module.exports = {
   checkIfCustomerExists,
   createCustomer,
   getCustomerByEmail,
   getAllCustomers,
   getCustomerById,
   updateCustomer,
   searchCustomer,
};
