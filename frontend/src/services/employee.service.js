// Import from the env
const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
   const requestOptions = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
   };
   console.log(requestOptions);
   const response = await fetch(`${api_url}/api/employee`, requestOptions);
   return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
   // console.log(token);
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };
   const response = await fetch(`${api_url}/api/employees`, requestOptions);
   return response;
};

// a function to get a single employee by id
const getEmployeeById = async (id, token) => {
   const requestOptions = {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };
   const response = await fetch(
      `${api_url}/api/employee/${id}`,
      requestOptions
   );
   return response;
};

// A function to update employee
const updateEmployee = async (id, formData, token) => {
   const requestOptions = {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
      body: JSON.stringify(formData),
   };
   const response = await fetch(
      `${api_url}/api/employee/${id}`,
      requestOptions
   );
   return response;
};

// A function to delete employee
const deleteEmployee = async (id, token) => {
   const requestOptions = {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
   };
   const response = await fetch(
      `${api_url}/api/employee/${id}`,
      requestOptions
   );
   return response;
};

// Export all the functions
const employeeService = {
   createEmployee,
   getAllEmployees,
   getEmployeeById,
   updateEmployee,
   deleteEmployee,
};
export default employeeService;
