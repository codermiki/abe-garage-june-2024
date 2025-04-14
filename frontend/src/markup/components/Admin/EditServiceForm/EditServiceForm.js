import React, { useState, useEffect } from "react";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";

function EditServiceForm({ id, setFetching, setUpdatingId }) {
   const [service_id, setServiceId] = useState("");
   const [service_name, setServiceName] = useState("");
   const [service_description, setServiceDescription] = useState("");

   // Errors
   const [nameRequired, setNameRequired] = useState("");
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");

   let loggedInEmployeeToken = "";
   const { employee } = useAuth();
   if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
   }

   useEffect(() => {
      // Fetch service data by ID
      serviceService
         .getServiceById(id, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((res) => res.data)
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
            } else {
               setServiceId(data.service_id || "");
               setServiceName(data.service_name || "");
               setServiceDescription(data.service_description || "");
               setServerError("");
               const element = document.getElementById(data.service_id);

               if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
               }
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

      if (!service_name) {
         setNameRequired("Service name is required");
         valid = false;
      } else {
         setNameRequired("");
      }

      if (!valid) return;

      const formData = {
         service_id,
         service_name,
         service_description,
      };

      serviceService
         .updateServiceById(service_id, formData, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
            } else {
               setSuccess(true);
               setServerError("");
               setFetching((prev) => !prev);
               setUpdatingId("");
               // make the page scrolled to upper side

               window.scrollTo(0, 0);
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
      <div className="row clearfix">
         <div className="form-column col-lg-7">
            <div className="inner-column">
               <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                     <div className="row clearfix">
                        <div className="form-group col-md-12">
                           <input
                              type="text"
                              name="service_name"
                              value={service_name}
                              onChange={(event) =>
                                 setServiceName(event.target.value)
                              }
                              placeholder="Service name"
                           />
                           {nameRequired && (
                              <div className="validation-error" role="alert">
                                 {nameRequired}
                              </div>
                           )}
                        </div>

                        <div className="form-group col-md-12">
                           <textarea
                              name="service_description"
                              value={service_description}
                              onChange={(event) =>
                                 setServiceDescription(event.target.value)
                              }
                              placeholder="Service description"
                           />
                        </div>

                        <div className="form-group col-md-12">
                           <button
                              className="theme-btn btn-style-one"
                              type="submit"
                              data-loading-text="Please wait..."
                           >
                              <span>Update Service</span>
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditServiceForm;
