// Import from the environment variables
const api_url = process.env.REACT_APP_API_URL;

// Function to add an order
const addOrder = async (orderData, loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/api/order`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
         body: JSON.stringify(orderData),
      });

      if (!response.ok) {
         throw new Error("Failed to add order");
      }

      return response;
   } catch (error) {
      console.error("Error adding order:", error);
      throw error;
   }
};

// Function to get all orders
const getAllOrders = async (loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/api/orders`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
      });

      if (!response.ok) {
         throw new Error("Failed to fetch orders");
      }

      return response;
   } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
   }
};

// Function to get a single order by ID
const getOrderById = async (orderId, loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/api/orders/${orderId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
      });

      if (!response.ok) {
         throw new Error("Failed to fetch order");
      }

      return await response.json();
   } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
   }
};

// Function to update an order
const updateOrder = async (orderId, orderData, loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/api/orders/${orderId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
         body: JSON.stringify(orderData),
      });

      if (!response.ok) {
         throw new Error("Failed to update order");
      }

      return await response.json();
   } catch (error) {
      console.error("Error updating order:", error);
      throw error;
   }
};

// Function to get orders by customer ID
const getOrdersByCustomerId = async (customerId, loggedInEmployeeToken) => {
   try {
      const response = await fetch(
         `${api_url}/api/orders/customer/${customerId}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "x-access-token": loggedInEmployeeToken,
            },
         }
      );

      // if (!response.ok) {
      //    throw new Error("Failed to fetch orders");
      // }

      return response;
   } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
   }
};

// Export the functions as part of the orderService object
const orderService = {
   addOrder,
   getAllOrders,
   getOrderById,
   updateOrder,
   getOrdersByCustomerId,
};

export default orderService;
