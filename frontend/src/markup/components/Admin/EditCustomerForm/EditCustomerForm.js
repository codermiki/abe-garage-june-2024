import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

function EditCustomerForm() {
   const { id } = useParams(); // Get the customer ID from the route params
   const [customer_id, setCustomerId] = useState("");
   const [customer_email, setEmail] = useState("");
   const [customer_first_name, setFirstName] = useState("");
   const [customer_last_name, setLastName] = useState("");
   const [customer_phone_number, setPhoneNumber] = useState("");
   const [active_customer_status, setActiveCustomerStatus] = useState(1);

   // Errors
   const [emailError, setEmailError] = useState("");
   const [firstNameRequired, setFirstNameRequired] = useState("");
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");

   let loggedInEmployeeToken = "";
   const { employee } = useAuth();
   if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
   }

   useEffect(() => {
      // Fetch customer data by ID
      customerService
         .getCustomerById(id, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((res) => res.data)
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
            } else {
               setCustomerId(data[0].customer_id || "");
               setEmail(data[0].customer_email || "");
               setFirstName(data[0].customer_first_name || "");
               setLastName(data[0].customer_last_name || "");
               setPhoneNumber(data[0].customer_phone_number || "");
               setActiveCustomerStatus(data[0].active_customer_status || 1);
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

      if (!customer_first_name) {
         setFirstNameRequired("First name is required");
         valid = false;
      } else {
         setFirstNameRequired("");
      }

      if (!customer_email) {
         setEmailError("Email is required");
         valid = false;
      } else {
         const regex = /^\S+@\S+\.\S+$/;
         if (!regex.test(customer_email)) {
            setEmailError("Invalid email format");
            valid = false;
         } else {
            setEmailError("");
         }
      }

      if (!valid) return;

      const formData = {
         customer_id,
         customer_email,
         customer_phone_number,
         customer_first_name,
         customer_last_name,
         active_customer_status,
      };

      customerService
         .updateCustomer(customer_id, formData, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
            } else {
               setSuccess(true);
               setServerError("");
               window.location.href = "/admin/customers";
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
               <h2>Edit Customer</h2>
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
                                 <input
                                    type="email"
                                    name="customer_email"
                                    value={customer_email}
                                    onChange={(event) =>
                                       setEmail(event.target.value)
                                    }
                                    placeholder="Customer email"
                                    disabled
                                 />
                                 {emailError && (
                                    <div
                                       className="validation-error"
                                       role="alert"
                                    >
                                       {emailError}
                                    </div>
                                 )}
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="customer_first_name"
                                    value={customer_first_name}
                                    onChange={(event) =>
                                       setFirstName(event.target.value)
                                    }
                                    placeholder="Customer first name"
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
                                    name="customer_last_name"
                                    value={customer_last_name}
                                    onChange={(event) =>
                                       setLastName(event.target.value)
                                    }
                                    placeholder="Customer last name"
                                 />
                              </div>

                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="customer_phone_number"
                                    value={customer_phone_number}
                                    onChange={(event) =>
                                       setPhoneNumber(event.target.value)
                                    }
                                    placeholder="Customer phone (555-555-5555)"
                                 />
                              </div>

                              <div className="form-group col-md-12">
                                 <select
                                    name="active_customer_status"
                                    value={active_customer_status}
                                    onChange={(event) =>
                                       setActiveCustomerStatus(
                                          event.target.value
                                       )
                                    }
                                 >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                 </select>
                              </div>

                              <div className="form-group col-md-12">
                                 <button
                                    className="theme-btn btn-style-one"
                                    type="submit"
                                    data-loading-text="Please wait..."
                                 >
                                    <span>Update Customer</span>
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

export default EditCustomerForm;
