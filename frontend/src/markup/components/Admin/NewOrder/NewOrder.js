import React, { useEffect, useState } from "react";
// import employee.service.js
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { LuPointer } from "react-icons/lu";

import customerService from "../../../../services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
// Import the useAuth hook
import { useAuth } from "../../../../Contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import serviceService from "../../../../services/service.service";
import orderService from "../../../../services/order.service";

function NewOrder() {
   const location = useLocation();
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [serverError, setServerError] = useState("");
   const [customerSelected, setCustomerSelected] = useState(false);
   const [vehicleSelected, setVehicleSelected] = useState(false);
   const [vehicles, setVehicles] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [order_total_price, setOrderTotalPrice] = useState("");
   const [additional_request, setAdditionalRequest] = useState("");
   const [services, setServices] = useState([]);
   const [selectedServices, setSelectedServices] = useState([]);
   const [customerServiceSelected, setCustomerServiceSelected] =
      useState(false);
   // const services = [
   //    {
   //       id: 1,
   //       title: "Oil change",
   //       description:
   //          "Every 5,000 kilometres or so, you need to change the oil in your car to keep your engine in the best possible shape.",
   //    },
   //    {
   //       id: 2,
   //       title: "Spark Plug replacement",
   //       description:
   //          "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.",
   //    },
   //    {
   //       id: 3,
   //       title: "Fuel Cap tightening",
   //       description:
   //          "Loose fuel caps are actually a main reason why the 'check engine' light in a car comes on.",
   //    },
   //    {
   //       id: 4,
   //       title: "Oxygen Sensor replacement",
   //       description:
   //          "Oxygen sensors measure the concentration of oxygen in the exhaust gabs in order to optimize engine performance and emissions.",
   //    },
   //    {
   //       id: 5,
   //       title: "Brake work",
   //       description:
   //          "We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.",
   //    },
   //    {
   //       id: 6,
   //       title: "Tire repairs and changes",
   //       description:
   //          "Without good, inflated tires, you lose speed, control, and fuel efficiency, hence the need to get them patched if there’s a leak.",
   //    },
   //    {
   //       id: 7,
   //       title: "The Ignition System",
   //       description:
   //          "A car’s ignition system includes its battery, starter, and the ignition itself.",
   //    },
   //    {
   //       id: 8,
   //       title: "Programing the camera software",
   //       description:
   //          "Without good, inflated tires, you lose speed, control, and fuel efficiency, hence the need to get them patched.",
   //    },
   // ];

   const [customer, setCustomer] = useState({
      customer_id: "",
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_phone_number: "",
   });

   const [vehicle, setVehicle] = useState({
      vehicle_id: "",
      make: "",
      model: "",
      year: "",
      license_plate: "",
   });

   const [service, setService] = useState({
      service_id: "",
      service_name: "",
      service_description: "",
      service_price: "",
   });

   // Create a variable to hold the user's token
   let loggedInEmployeeToken = "";
   // Destructure the auth hook and get the token
   const { employee } = useAuth();
   if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
   }

   const handleSearch = (e) => {
      e.preventDefault();

      if (!searchQuery) {
         setServerError("Search query is required");
         return;
      }

      customerService
         .searchCustomer(searchQuery, loggedInEmployeeToken)
         .then((response) => response.json())
         .then((data) => {
            if (data.error) {
               setServerError(data.error);
               setSearchResults([]);
            } else {
               setSearchResults(data?.data || []);
               setServerError("");
               const element = document.getElementById(
                  data?.data[0]?.customer_id
                     ? data?.data[0]?.customer_id
                     : "search-results"
               );

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
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      const orderData = {
         employee_id: employee.employee_id,
         customer_id: customer.customer_id,
         vehicle_id: vehicle.vehicle_id,
         order_service: selectedServices.map((service_id) => {
            return {
               service_id: service_id,
            };
         }),
         order_total_price: order_total_price,
         order_description: additional_request,
      };

      orderService
         .addOrder(orderData, loggedInEmployeeToken)
         .then((response) => {
            response.json().then((data) => {
               console.log(data);
               if (data.error) {
                  setServerError(data.error);
                  setIsLoading(false);
               } else {
                  setServerError("");
                  setIsLoading(false);
                  // Redirect to the order list page after successful submission
                  navigate("/admin/orders", { replace: true });
               }
            });
         });
   };

   useEffect(() => {
      if (customerSelected) {
         vehicleService
            .getVehiclesByCustomerId(
               customer?.customer_id,
               loggedInEmployeeToken
            )
            .then((response) => response.json())
            .then((data) => {
               if (data.error) {
                  setServerError(data.error);
                  setVehicles([]);
               } else {
                  setVehicles(data?.data || []);
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
      }
   }, [customerSelected]);

   useEffect(() => {
      if (vehicleSelected) {
         serviceService
            .getAllServices(loggedInEmployeeToken)
            .then((response) => response.json())
            .then((data) => {
               if (data.error) {
                  setServerError(data.error);
               } else {
                  setServices(data?.data || []);
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
      }
   }, [vehicleSelected]);

   return (
      <section className="contact-section">
         <div className="auto-container">
            <div className="contact-title">
               <h2>Create a new order</h2>
            </div>
            <div className="row clearfix">
               {!customerSelected ? (
                  <div className="form-column col-lg-12">
                     <div className="inner-column">
                        <div className="contact-form">
                           <form onSubmit={handleSearch}>
                              <div className="row clearfix">
                                 <div className="form-group col-md-11 position-relative d-flex ">
                                    <input
                                       type="text"
                                       name="searchQuery"
                                       value={searchQuery}
                                       onChange={(event) => {
                                          setSearchQuery(event.target.value);
                                       }}
                                       className="col-md-11"
                                       placeholder="Search by email, name, or phone"
                                       style={{
                                          width: "90%",
                                       }}
                                    />
                                    <button
                                       type="submit"
                                       style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          cursor: "pointer",
                                       }}
                                       className="form-group col-md-1 h-100"
                                    >
                                       <FaSearch size={20} />
                                    </button>
                                 </div>
                                 {/* display search result of the customer */}
                                 <div className="search-results form-group col-md-11">
                                    <Table striped bordered hover>
                                       <tbody>
                                          {searchResults?.length > 0 ? (
                                             searchResults.map((customer) => (
                                                <tr key={customer.customer_id}>
                                                   <td>
                                                      {
                                                         customer.customer_first_name
                                                      }
                                                   </td>
                                                   <td>
                                                      {
                                                         customer.customer_last_name
                                                      }
                                                   </td>
                                                   <td>
                                                      {customer.customer_email}
                                                   </td>
                                                   <td>
                                                      {
                                                         customer.customer_phone_number
                                                      }
                                                   </td>

                                                   <td>
                                                      <div className="edit-delete-icons">
                                                         <a
                                                            className="m-2"
                                                            href=""
                                                            onClick={(e) => {
                                                               e.preventDefault();
                                                               setCustomerSelected(
                                                                  (prev) =>
                                                                     !prev
                                                               );
                                                               setCustomer({
                                                                  customer_id:
                                                                     customer.customer_id,
                                                                  customer_first_name:
                                                                     customer.customer_first_name,
                                                                  customer_last_name:
                                                                     customer.customer_last_name,
                                                                  customer_email:
                                                                     customer.customer_email,
                                                                  customer_phone_number:
                                                                     customer.customer_phone_number,
                                                                  active_customer_status:
                                                                     customer.active_customer_status,
                                                               });
                                                            }}
                                                         >
                                                            <LuPointer />
                                                         </a>
                                                      </div>
                                                   </td>
                                                </tr>
                                             ))
                                          ) : (
                                             <tr>
                                                <td rowSpan={4}>
                                                   No results found
                                                </td>
                                             </tr>
                                          )}
                                       </tbody>
                                    </Table>
                                 </div>
                              </div>
                           </form>
                           <div className="form-group col-md-12">
                              <button
                                 className="theme-btn btn-style-one"
                                 type="submit"
                                 data-loading-text="Please wait..."
                              >
                                 <a
                                    href="/admin/add-customer"
                                    style={{ color: "white" }}
                                 >
                                    <span>ADD NEW CUSTOMER</span>
                                 </a>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <>
                     {/* Display customer info */}
                     <div className="card col-md-11 m-3 p-3 position-relative">
                        <div className="card-body">
                           <h5 className="card-title">
                              {customer?.customer_first_name}{" "}
                              {customer?.customer_last_name}
                           </h5>
                           <p className="card-text">
                              Email:
                              <span className="text-muted">
                                 {customer?.customer_email}
                              </span>
                           </p>
                           <p className="card-text">
                              Phone Number:
                              <span className="text-muted">
                                 {customer?.customer_phone_number}
                              </span>
                           </p>
                           <p className="card-text">
                              Active Customer:{" "}
                              <span className="text-muted">
                                 {customer?.active_customer_status
                                    ? "Yes"
                                    : "No"}
                              </span>
                           </p>
                           <p className="card-text">
                              Edit customer info :{" "}
                              <span className="text-red mouse-pointer">
                                 {/* edit customer */}
                                 <Link
                                    to={`/admin/customers/edit/${customer.customer_id}`}
                                    state={{ from: location.pathname }}
                                    onClick={(e) => {
                                       setCustomerSelected(true);
                                    }}
                                    className="m-2"
                                 >
                                    <FaEdit />
                                 </Link>
                              </span>
                           </p>
                        </div>
                        <FaWindowClose
                           size={20}
                           style={{
                              cursor: "pointer",
                              color: "red",
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                           }}
                           onClick={() => setCustomerSelected((prev) => !prev)}
                        />
                     </div>

                     {/* choice vehicle */}
                     {!vehicleSelected ? (
                        <div className="card col-md-11 m-3 p-3 position-relative">
                           <div className="card-body">
                              <h5 className="card-title">Choice Vehicle</h5>
                           </div>
                           <p className="card-text">Vehicle info</p>
                           <div className="search-results form-group col-md-11">
                              <Table striped bordered hover>
                                 <thead>
                                    <tr>
                                       <th>Year</th>
                                       <th>Make</th>
                                       <th>Model</th>
                                       <th>Tag</th>
                                       <th>Serial</th>
                                       <th>Color</th>
                                       <th>Mileage</th>
                                       <th>Choose</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {vehicles?.length > 0 ? (
                                       vehicles?.map((vehicle) => (
                                          <tr key={vehicle.vehicle_id}>
                                             <td>{vehicle.vehicle_year}</td>
                                             <td>{vehicle.vehicle_make}</td>
                                             <td>{vehicle.vehicle_model}</td>
                                             <td>{vehicle.vehicle_tag}</td>
                                             <td>{vehicle.vehicle_serial}</td>
                                             <td>{vehicle.vehicle_color}</td>
                                             <td>{vehicle.vehicle_mileage}</td>
                                             <td>
                                                <div className="edit-delete-icons">
                                                   <a
                                                      className="m-2"
                                                      href=""
                                                      onClick={(e) => {
                                                         e.preventDefault();
                                                         setVehicleSelected(
                                                            (prev) => !prev
                                                         );
                                                         setVehicle({
                                                            vehicle_id:
                                                               vehicle.vehicle_id,
                                                            vehicle_make:
                                                               vehicle.vehicle_make,
                                                            vehicle_model:
                                                               vehicle.vehicle_model,
                                                            vehicle_year:
                                                               vehicle.vehicle_year,
                                                            vehicle_tag:
                                                               vehicle.vehicle_tag,
                                                            vehicle_serial:
                                                               vehicle.vehicle_serial,
                                                            vehicle_color:
                                                               vehicle.vehicle_color,
                                                            vehicle_mileage:
                                                               vehicle.vehicle_mileage,
                                                         });
                                                      }}
                                                   >
                                                      <LuPointer />
                                                   </a>
                                                </div>
                                             </td>
                                          </tr>
                                       ))
                                    ) : (
                                       <tr>
                                          <td colSpan={8}>No vehicles found</td>
                                       </tr>
                                    )}
                                 </tbody>
                              </Table>
                           </div>
                        </div>
                     ) : (
                        <>
                           <>
                              <div className="card col-md-11 m-3 p-3 position-relative">
                                 <div className="card-body">
                                    <h5 className="card-title">
                                       {vehicle?.vehicle_make}{" "}
                                       {vehicle?.vehicle_model}
                                    </h5>
                                    <p className="card-text">
                                       Vehicle color:
                                       <span className="text-muted">
                                          {vehicle?.vehicle_color}
                                       </span>
                                    </p>
                                    <p className="card-text">
                                       Vehicle tag:
                                       <span className="text-muted">
                                          {vehicle?.vehicle_tag}
                                       </span>
                                    </p>
                                    <p className="card-text">
                                       Vehicle year:{" "}
                                       <span className="text-muted">
                                          {vehicle?.vehicle_year}
                                       </span>
                                    </p>
                                    <p className="card-text">
                                       Vehicle mileage:{" "}
                                       <span className="text-muted">
                                          {vehicle?.vehicle_mileage}
                                       </span>
                                    </p>
                                    <p className="card-text">
                                       Vehicle serial:{" "}
                                       <span className="text-muted">
                                          {vehicle?.vehicle_serial}
                                       </span>
                                    </p>
                                    <p className="card-text">
                                       Edit Vehicle info :{" "}
                                       <span className="text-red mouse-pointer">
                                          {/* edit customer */}
                                          <Link
                                             to={`/admin/vehicles/edit/${vehicle.vehicle_id}`}
                                             state={{ from: location.pathname }}
                                             // onClick={(e) => {
                                             //    setCustomerSelected(true);
                                             // }}
                                             className="m-2"
                                          >
                                             <FaEdit />
                                          </Link>
                                       </span>
                                    </p>
                                 </div>
                                 <FaWindowClose
                                    size={20}
                                    style={{
                                       cursor: "pointer",
                                       color: "red",
                                       position: "absolute",
                                       top: "10px",
                                       right: "10px",
                                    }}
                                    onClick={() =>
                                       setVehicleSelected((prev) => !prev)
                                    }
                                 />
                              </div>
                           </>
                           {/* choice service  */}
                           <>
                              <div className="card col-md-11 m-3 p-3 position-relative">
                                 <div className="services">
                                    <h2>Choose service</h2>
                                    <ul id="service-list">
                                       {services?.length > 0 ? (
                                          services?.map((service) => {
                                             const isSelected =
                                                selectedServices.some(
                                                   (service_id) =>
                                                      service_id ===
                                                      service.service_id
                                                );
                                             return (
                                                <li>
                                                   <label
                                                      htmlFor={
                                                         service.service_id
                                                      }
                                                      key={service.service_id}
                                                   >
                                                      <h4>
                                                         {service.service_name}
                                                      </h4>
                                                      <p>
                                                         {
                                                            service.service_description
                                                         }
                                                      </p>
                                                   </label>
                                                   <input
                                                      id={service.service_id}
                                                      name="service_id"
                                                      onClick={() => {
                                                         setSelectedServices(
                                                            (prev) => {
                                                               if (isSelected) {
                                                                  // Remove if already selected
                                                                  return prev.filter(
                                                                     (
                                                                        service_id
                                                                     ) =>
                                                                        service_id !==
                                                                        service.service_id
                                                                  );
                                                               } else {
                                                                  // Add if not selected
                                                                  return [
                                                                     ...prev,
                                                                     service.service_id,
                                                                  ];
                                                               }
                                                            }
                                                         );
                                                      }}
                                                      type="checkbox"
                                                      value={service.service_id}
                                                   />
                                                </li>
                                             );
                                          })
                                       ) : (
                                          <>
                                             <li>No services found</li>
                                          </>
                                       )}
                                    </ul>
                                 </div>
                              </div>
                           </>

                           {/* additional service */}
                           <>
                              <div className="card col-md-11 m-3 p-3 position-relative">
                                 <div className="auto-container">
                                    <div className="contact-title">
                                       <h2>Additional request</h2>
                                    </div>

                                    <div className="row clearfix">
                                       <div className="form-column col-lg-12">
                                          <div className="inner-column">
                                             <div className="contact-form">
                                                <form onSubmit={handleSubmit}>
                                                   <div className="row clearfix">
                                                      <div className="form-group col-md-12">
                                                         <textarea
                                                            name="service_description"
                                                            value={
                                                               additional_request
                                                            }
                                                            onChange={(event) =>
                                                               setAdditionalRequest(
                                                                  event.target
                                                                     .value
                                                               )
                                                            }
                                                            placeholder="Service description"
                                                            required
                                                         />
                                                      </div>
                                                      <div className="form-group col-md-12">
                                                         <input
                                                            type="text"
                                                            name="order_total_price"
                                                            value={
                                                               order_total_price
                                                            }
                                                            onChange={(event) =>
                                                               setOrderTotalPrice(
                                                                  event.target
                                                                     .value
                                                               )
                                                            }
                                                            placeholder="Price"
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
                                                                  : "SUBMIT ORDER"}
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
                           </>
                        </>
                     )}
                  </>
               )}
            </div>
         </div>
      </section>
   );
}

export default NewOrder;
