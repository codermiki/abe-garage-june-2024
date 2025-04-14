// Import the customer service
const customerService = require("../services/customer.service");

// Create the add customer controller
async function createCustomer(req, res, next) {
   try {
      // Check if customer email already exists in the database
      const customerExists = await customerService.checkIfCustomerExists(
         req.body.customer_email
      );

      if (customerExists) {
         return res.status(400).json({
            error: "This email address is already associated with another customer!",
         });
      }

      const customerData = req.body;
      const customer = await customerService.createCustomer(customerData);

      if (!customer) {
         return res.status(400).json({
            error: "Failed to add the customer!",
         });
      }

      res.status(200).json({
         status: "true",
      });
   } catch (err) {
      console.error("Error creating customer:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the getAllCustomers controller
async function getAllCustomers(req, res, next) {
   try {
      const customers = await customerService.getAllCustomers();

      if (!customers) {
         return res.status(400).json({
            error: "Failed to get all customers!",
         });
      }

      res.status(200).json({
         status: "success",
         data: customers,
      });
   } catch (err) {
      console.error("Error fetching customers:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the getCustomerById controller
async function getCustomerById(req, res, next) {
   try {
      const customerId = req.params.id;
      // console.log(customerId)
      const customer = await customerService.getCustomerById(customerId);
      if (!customer) {
         return res.status(400).json({
            error: "Failed to get the customer!",
         });
      }

      res.status(200).json({
         status: "success",
         data: customer,
      });
   } catch (err) {
      console.error("Error fetching customer:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the updateCustomer controller
async function updateCustomer(req, res, next) {
   try {
      const customerId = req.params.id;
      const customerData = req.body;

      const isUpdated = await customerService.updateCustomer(
         customerId,
         customerData
      );

      if (!isUpdated) {
         return res.status(400).json({
            error: "Failed to update the customer!",
         });
      }

      res.status(200).json({
         status: "success",
         message: "Customer updated successfully!",
      });
   } catch (err) {
      console.error("Error updating customer:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Create the searchCustomer controller
async function searchCustomer(req, res, next) {
   try {
      const searchQuery = req.params.searchQuery;
      const customers = await customerService.searchCustomer(searchQuery);

      if (!customers) {
         return res.status(400).json({
            error: "Failed to search for customers!",
         });
      }

      res.status(200).json({
         status: "success",
         data: customers,
      });
   } catch (err) {
      console.error("Error searching for customers:", err);
      res.status(500).json({
         error: "Something went wrong!",
      });
   }
}

// Export the controllers
module.exports = {
   createCustomer,
   getAllCustomers,
   getCustomerById,
   updateCustomer,
   searchCustomer,
};
