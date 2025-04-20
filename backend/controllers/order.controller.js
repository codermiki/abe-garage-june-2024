const orderService = require("../services/order.service");

// Create the addOrder controller
const addOrder = async (req, res) => {
   try {
      const order = await orderService.addOrder(req.body);
      if (!order) {
         return res.status(400).json({
            error: "Failed to add the order!",
         });
      }
      res.status(200).json({
         status: "true",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Create the getAllOrdersOfCustomer controller
const getAllOrdersOfCustomer = async (req, res) => {
   try {
      const customerId = req.params.customerId;
      const orders = await orderService.getAllOrdersOfCustomer(customerId);
      if (!orders) {
         return res.status(400).json({
            error: "Failed to get all orders!",
         });
      }
      res.status(200).json({
         status: "success",
         data: orders,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// exports
module.exports = {
   addOrder,
   getAllOrdersOfCustomer,
};
