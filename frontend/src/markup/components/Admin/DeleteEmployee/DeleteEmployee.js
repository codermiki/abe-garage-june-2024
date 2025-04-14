import React, { useEffect } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service";

function DeleteEmployee() {
   // Create all the states we need to store the data

   const [apiErrorMessage, setApiErrorMessage] = useState(null);

   const { employee } = useAuth();
   let token = null; // To store the token
   if (employee) {
      token = employee.employee_token;
   }
   // Call the deleteEmployee function

   useEffect(() => {
      const DeleteEmployee = employeeService.deleteEmployee(token);

      DeleteEmployee.then((res) => {
         if (res.ok) {
            console.log("Employee deleted successfully");
            window.location.href = "/admin/employees";
         } else {
            console.log(res.status);
            window.location.href = "/admin/employees";
         }
      }).catch((err) => {
         // console.log(err);
         setApiError(true);
         setApiErrorMessage("An error occurred while deleting the employee.");
      });
   }, []);

   return <></>;
}

export default DeleteEmployee;
