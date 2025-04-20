// Import from the environment variables
const api_url = process.env.REACT_APP_API_URL;

// function to add a vehicle
const addVehicle = async (vehicleData, loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/api/vehicle`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
         body: JSON.stringify(vehicleData),
      });
      // console.log(response);
      if (!response.ok) {
         throw new Error("Failed to add vehicle");
      }

      return response;
   } catch (error) {
      console.error("Error adding vehicle:", error);
      throw error;
   }
};

// function to Get Single Vehicle
const getVehicleById = async (vehicleId, loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/vehicles/${vehicleId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
      });
      console.log(response);
      if (!response.ok) {
         throw new Error("Failed to fetch vehicle");
      }

      return await response.json();
   } catch (error) {
      console.error("Error fetching vehicle:", error);
      throw error;
   }
};

// function to Update Vehicle
const updateVehicle = async (vehicleId, vehicleData, loggedInEmployeeToken) => {
   try {
      const response = await fetch(`${api_url}/vehicles/${vehicleId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "x-access-token": loggedInEmployeeToken,
         },
         body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
         throw new Error("Failed to update vehicle");
      }

      return await response.json();
   } catch (error) {
      console.error("Error updating vehicle:", error);
      throw error;
   }
};

// function to Get Vehicles Per Customer
const getVehiclesByCustomerId = async (customerId, loggedInEmployeeToken) => {
   try {
      const response = await fetch(
         `${api_url}/api/vehicles/customer/${customerId}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "x-access-token": loggedInEmployeeToken,
            },
         }
      );

      if (!response.ok) {
         throw new Error("Failed to fetch vehicles");
      }

      return response;
   } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw error;
   }
};

// Add the function to the exported object
const vehicleService = {
   addVehicle,
   getVehicleById,
   updateVehicle,
   getVehiclesByCustomerId,
};

export default vehicleService;
