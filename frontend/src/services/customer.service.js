// Import from the environment variables
const api_url = process.env.REACT_APP_API_URL;

// A function to send a POST request to create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
   const requestOptions = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
   };

   try {
      const response = await fetch(`${api_url}/api/customer`, requestOptions);
      return response;
   } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
   }
};

// A function to send a GET request to retrieve all customers
const getAllCustomers = async (token) => {
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };

   try {
      const response = await fetch(`${api_url}/api/customer`, requestOptions);
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
   } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
   }
};

// A function to send a GET request to retrieve a customer by ID
const getCustomerById = async (id, token) => {
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };

   try {
      const response = await fetch(
         `${api_url}/api/customer/${id}`,
         requestOptions
      );
      // console.log(response)
      // if (!response?.ok) {
      //    throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      return response;
   } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
   }
};

// A function to send a PUT request to update a customer by ID
const updateCustomer = async (id, formData, token) => {
   const requestOptions = {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
      body: JSON.stringify(formData),
   };

   try {
      const response = await fetch(
         `${api_url}/api/customer/${id}`,
         requestOptions
      );
      return response;
   } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
   }
};


// A function to search for a customer by name or email or phone number
const searchCustomer = async (searchQuery, token) => {
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };

   try {
      const response = await fetch(
         `${api_url}/api/customer/search/${searchQuery}`,
         requestOptions
      );
      return response;
   } catch (error) {
      console.error("Error searching customer:", error);
      throw error;
   }
};

// Export all the functions
const customerService = {
   createCustomer,
   getAllCustomers,
   getCustomerById,
   updateCustomer,
   searchCustomer,
};

export default customerService;
