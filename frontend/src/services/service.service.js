// Import from the environment variables
const api_url = process.env.REACT_APP_API_URL;

// A function to send a POST request to create a new service
const createService = async (formData, loggedInEmployeeToken) => {
   const requestOptions = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
   };

   try {
      const response = await fetch(`${api_url}/api/service`, requestOptions);
      // console.log(response);
      return response;
   } catch (error) {
      console.error("Error creating service:", error);
      throw error;
   }
};

// A function to send a GET request to retrieve all services
const getAllServices = async (token) => {
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };

   try {
      const response = await fetch(`${api_url}/api/service`, requestOptions);
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
   } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
   }
};

// A function to send a GET request to retrieve a service by ID
const getServiceById = async (serviceId, token) => {
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };

   try {
      const response = await fetch(
         `${api_url}/api/service/${serviceId}`,
         requestOptions
      );
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
   } catch (error) {
      console.error("Error fetching service:", error);
      throw error;
   }
};

// A function to send a PUT request to update a service by ID
const updateServiceById = async (serviceId, formData, token) => {
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
         `${api_url}/api/service/${serviceId}`,
         requestOptions
      );
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
   } catch (error) {
      console.error("Error updating service:", error);
      throw error;
   }
};

// A function to send a DELETE request to delete a service by ID
const deleteServiceById = async (serviceId, token) => {
   const requestOptions = {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };

   try {
      const response = await fetch(
         `${api_url}/api/service/${serviceId}`,
         requestOptions
      );
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
   } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
   }
};

// Export all the functions
const serviceService = {
   createService,
   getAllServices,
   getServiceById,
   updateServiceById,
   deleteServiceById,
};
export default serviceService;
