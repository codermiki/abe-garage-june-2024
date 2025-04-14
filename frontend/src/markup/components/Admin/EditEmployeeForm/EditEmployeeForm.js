import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";

function EditEmployeeForm() {
   const { id } = useParams(); // Get the employee ID from the route params
   const [employee_id, setEmployeeId] = useState("");
   const [employee_first_name, setFirstName] = useState("");
   const [employee_last_name, setLastName] = useState("");
   const [employee_phone, setPhoneNumber] = useState("");
   const [active_employee, setActiveEmployeeStatus] = useState(1);
   const [company_role_id, setCompanyRoleId] = useState("");

   // Errors
   const [firstNameRequired, setFirstNameRequired] = useState("");
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");

   let loggedInEmployeeToken = "";
   const { employee } = useAuth();
   if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
   }

   useEffect(() => {
      // Fetch employee data by ID
      employeeService
         .getEmployeeById(id, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((res) => res.data)
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
            } else {
               setEmployeeId(data.employee_id || "");
               setFirstName(data.employee_first_name || "");
               setLastName(data.employee_last_name || "");
               setPhoneNumber(data.employee_phone || "");
               setActiveEmployeeStatus(data.active_employee || 1);
               setCompanyRoleId(data.company_role_id || "");
               setServerError("");
            }
         })
         .catch((error) => {
            const resMessage =
               (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
               error.message ||
               error.toString();
            setServerError(resMessage);
         });
   }, [id, loggedInEmployeeToken]);

   const handleSubmit = (e) => {
      e.preventDefault();
      let valid = true;

      if (!employee_first_name) {
         setFirstNameRequired("First name is required");
         valid = false;
      } else {
         setFirstNameRequired("");
      }

      if (!valid) return;

      const formData = {
         employee_id,
         employee_first_name,
         employee_last_name,
         employee_phone,
         active_employee,
         company_role_id,
      };

      employeeService
         .updateEmployee(employee_id, formData, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
            } else {
               setSuccess(true);
               setServerError("");
               window.location.href = "/admin/employees";
            }
         })
         .catch((error) => {
            const resMessage =
               (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
               error.message ||
               error.toString();
            setServerError(resMessage);
         });
   };

   return (
      <section className="contact-section">
         <div className="auto-container">
            <div className="contact-title">
               <h2>Edit Employee</h2>
            </div>
            <div className="row clearfix">
               <div className="form-column col-lg-7">
                  <div className="inner-column">
                     <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                           <div className="row clearfix">
                              <div className="form-group col-md-12">
                                 {serverError && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {serverError}
                                    </div>
                                 )}
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="employee_first_name"
                                    value={employee_first_name}
                                    onChange={(event) =>
                                       setFirstName(event.target.value)
                                    }
                                    placeholder="Employee first name"
                                 />
                                 {firstNameRequired && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {firstNameRequired}
                                    </div>
                                 )}
                              </div>

                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="employee_last_name"
                                    value={employee_last_name}
                                    onChange={(event) =>
                                       setLastName(event.target.value)
                                    }
                                    placeholder="Employee last name"
                                 />
                              </div>

                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="employee_phone"
                                    value={employee_phone}
                                    onChange={(event) =>
                                       setPhoneNumber(event.target.value)
                                    }
                                    placeholder="Employee phone (555-555-5555)"
                                 />
                              </div>

                              <div className="form-group col-md-12">
                                 <select
                                    name="active_employee"
                                    value={active_employee}
                                    onChange={(event) =>
                                       setActiveEmployeeStatus(
                                          event.target.value
                                       )
                                    }
                                 >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                 </select>
                              </div>

                              <div className="form-group col-md-12">
                                 <select
                                    name="company_role_id"
                                    value={company_role_id}
                                    onChange={(event) =>
                                       setCompanyRoleId(event.target.value)
                                    }
                                 >
                                    <option value={1}>Employee</option>
                                    <option value={2}>Manager</option>
                                    <option value={3}>Admin</option>
                                 </select>
                              </div>

                              <div className="form-group col-md-12">
                                 <button
                                    className="theme-btn btn-style-one"
                                    type="submit"
                                    data-loading-text="Please wait..."
                                 >
                                    <span>Update Employee</span>
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default EditEmployeeForm;
