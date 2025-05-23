import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import EditServiceForm from "../EditServiceForm/EditServiceForm";
import { ClipLoader } from "react-spinners";

function ServiceList() {
   const [services, setServices] = useState([]);
   const [service_name, setServiceName] = useState("");
   const [service_description, setServiceDescription] = useState("");
   const [serverError, setServerError] = useState(null);
   const [fetching, setFetching] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [updatingId, setUpdatingId] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);

   let loggedInEmployeeToken = "";
   const { employee } = useAuth();
   if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      setServerError(null);
      setIsLoading(true);

      const formData = {
         service_name,
         service_description,
      };

      try {
         const newService = serviceService.createService(
            formData,
            loggedInEmployeeToken
         );
         const response = await newService.then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         });

         if (!response.status) {
            setServerError("Failed to add service.");
            return;
         }

         setFetching((prev) => !prev);
         setIsLoading(false);
         setServiceName("");
         setServiceDescription("");
         setServerError("Service added successfully.");

         setTimeout(() => {
            // make the page scrolled to the new added service
            const element = document.getElementById(
               services[services.length - 1]?.service_id
            );

            if (element) {
               element.scrollIntoView({
                  behavior: "smooth",
               });
            }
         }, 500);

         setTimeout(() => {
            setServerError(null);
         }, 3000);
      } catch (error) {
         setServerError("Failed to add service. Please try again.");
      }
   };

   const handleDelete = async (serviceId) => {
      if (window.confirm("Are you sure you want to delete this service?")) {
         setServerError(null);
         try {
            const response = await serviceService.deleteServiceById(
               serviceId,
               loggedInEmployeeToken
            );
            if (response.ok) {
               const res = await response.json();
               if (res.status === "success") {
                  setFetching((prev) => !prev);
                  if (currentServices.length === 1) {
                     setCurrentPage((prev) => prev - 1);
                  }
                  setServerError("Service deleted successfully.");
                  const element = document.getElementById(
                     services[services.length - 2]?.service_id
                  );

                  if (element) {
                     element.scrollIntoView({ behavior: "smooth" });
                  }
                  setTimeout(() => {
                     setServerError(null);
                  }, 3000);
               } else {
                  setServerError("Failed to delete service.");
               }
            } else {
               setServerError("Failed to delete service.");
            }
         } catch (error) {
            setServerError("Failed to delete service. Please try again.");
         }
      }
   };

   useEffect(() => {
      const fetchServices = async () => {
         setLoading(true);
         try {
            const response = await serviceService.getAllServices(
               loggedInEmployeeToken
            );
            if (response.ok) {
               const res = await response.json();
               const { status, data } = res;
               if (status !== "success") {
                  setLoading(false);
                  setServerError("Failed to fetch services.");
                  return;
               }

               setServices(data);
               setLoading(false);
            } else {
               setLoading(false);
               setServerError("Failed to fetch services.");
            }
         } catch (error) {
            setServerError("Failed to fetch services. Please try again.");
            setLoading(false);
         }
      };

      fetchServices();
   }, [fetching]);

   const servicePerPage = 5; // Number of customers to display per page
   const indexOfLastService = currentPage * servicePerPage; // Index of the last customer on the current page
   const indexOfFirstService = indexOfLastService - servicePerPage; // Index of the first customer on the current page
   const currentServices = services.slice(
      indexOfFirstService,
      indexOfLastService
   ); // Current customers to display

   const totalPages = Math.ceil(services.length / servicePerPage); // Total number of pages

   // handle next page
   const handleNext = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   // handle previous page
   const handlePrev = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   return (
      <div>
         <section className="services-section">
            <div className="auto-container">
               <div className="sec-title style-two">
                  <h2>Services we provide</h2>
                  <div className="text">
                     Bring to the table win-win survival strategies to ensure
                     proactive domination. At the end of the day, going forward,
                     a new normal that has evolved from generation X is on the
                     runway heading towards a streamlined cloud solution.{" "}
                  </div>
               </div>

               <div className="row w-100">
                  {loading ? (
                     <div className="mx-auto">
                        <ClipLoader
                           color="#36d7b7"
                           loading={loading}
                           size={50}
                        />
                     </div>
                  ) : (
                     currentServices?.map((service, index) => (
                        <>
                           <div
                              key={service?.service_id || index}
                              className="col-lg-12 service-block-one"
                              id={`${service?.service_id}`}
                           >
                              <div
                                 style={{
                                    padding: "20px",
                                    position: "relative",
                                 }}
                                 className="inner-box hvr-float-shadow"
                              >
                                 <h5>{service?.service_name}</h5>
                                 <p>{service?.service_description}</p>
                                 <div className="icon edit-delete-icons">
                                    <a
                                       href=""
                                       onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setUpdatingId(service?.service_id);
                                       }}
                                    >
                                       {updatingId != service?.service_id ? (
                                          <FaEdit size={20} />
                                       ) : (
                                          ""
                                       )}
                                    </a>
                                    <a
                                       href=""
                                       onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          return handleDelete(
                                             service?.service_id
                                          );
                                       }}
                                       style={{
                                          background: "none",
                                          border: "none",
                                          cursor: "pointer",
                                       }}
                                    >
                                       <MdDelete size={20} />
                                    </a>
                                 </div>
                                 {updatingId == service?.service_id ? (
                                    <EditServiceForm
                                       id={service?.service_id}
                                       setFetching={setFetching}
                                       setUpdatingId={setUpdatingId}
                                       prop_serviceData={service}
                                    />
                                 ) : (
                                    ""
                                 )}
                              </div>
                           </div>
                        </>
                     ))
                  )}
               </div>

               {totalPages > 1 && (
                  <>
                     <nav>
                        <ul className="pagination justify-content-center">
                           <li
                              className={`page-item ${
                                 currentPage === 1 && "disabled"
                              }`}
                           >
                              <button
                                 className="page-link"
                                 onClick={handlePrev}
                              >
                                 Previous
                              </button>
                           </li>
                           <li className="page-item disabled">
                              <span className="page-link">
                                 Page {currentPage} of {totalPages}
                              </span>
                           </li>
                           <li
                              className={`page-item ${
                                 currentPage === totalPages && "disabled"
                              }`}
                           >
                              <button
                                 className="page-link"
                                 onClick={handleNext}
                              >
                                 Next
                              </button>
                           </li>
                        </ul>
                     </nav>
                  </>
               )}

               {serverError && (
                  <div
                     className="alert alert-danger"
                     role="alert"
                     style={{
                        position: "fixed",
                        top: 0,
                        left: "50%",
                        opacity: 1,
                        transition: "opacity 0.5s ease-in-out",
                        zIndex: 1000,
                     }}
                  >
                     {serverError}
                     <div
                        style={{
                           position: "absolute",
                           bottom: 0,
                           left: 0,
                           height: "4px",
                           width: "100%",
                           background:
                              "linear-gradient(90deg, #28a745, #28a745)",
                           animation: "loadingLine 3s infinite",
                        }}
                     ></div>
                  </div>
               )}

               <div className="auto-container">
                  <div className="contact-title">
                     <h2>Add a new Service</h2>
                  </div>

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
                                          required
                                       />
                                    </div>
                                    <div className="form-group col-md-12">
                                       <textarea
                                          name="service_description"
                                          value={service_description}
                                          onChange={(event) =>
                                             setServiceDescription(
                                                event.target.value
                                             )
                                          }
                                          placeholder="Service description"
                                          required
                                       />
                                    </div>

                                    <div className="form-group col-md-12">
                                       <button
                                          className="theme-btn btn-style-one"
                                          type="submit"
                                          data-loading-text="Please wait..."
                                       >
                                          <span>
                                             {isLoading
                                                ? "please wait..."
                                                : "Add Service"}
                                          </span>
                                       </button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <style>
            {`
               @keyframes loadingLine {
                  0% {
                     transform: scaleX(0);
                     transform-origin: left;
                  }
                  50% {
                     transform: scaleX(1);
                     transform-origin: left;
                  }
                  100% {
                     transform: scaleX(0);
                     transform-origin: right;
                  }
               }
            `}
         </style>
      </div>
   );
}

export default ServiceList;
