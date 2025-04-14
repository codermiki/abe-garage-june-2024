import React, { useState } from "react";
// import employee.service.js
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { LuPointer } from "react-icons/lu";

import customerService from "../../../../services/customer.service";
// Import the useAuth hook
import { useAuth } from "../../../../Contexts/AuthContext";

function NewOrder() {
   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [serverError, setServerError] = useState("");
   const [customerSelected, setCustomerSelected] = useState(true);
   const [customer, setCustomer] = useState({
      customer_id: "",
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_phone_number: "",
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

   return (
      <section className="contact-section">
         <div className="auto-container">
            <div className="contact-title">
               <h2>Create a new order</h2>
            </div>
            <div className="row clearfix">
               {customerSelected ? (
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
                                          return handleSearch(event);
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
                                                                  false
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
                                 <a
                                    className="m-2"
                                    href={`/admin/customers/edit/${customer.customer_id}`}
                                    onClick={(e) => {
                                       setCustomerSelected(true);
                                    }}
                                 >
                                    <FaEdit />
                                 </a>
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
                     <div className="card col-md-11 m-3 p-3 position-relative">
                        <div className="card-body">
                           <h5 className="card-title">Choice Vehicle</h5>
                           <p className="card-text">Vehicle info</p>
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
                     {/* choice service */}
                     {/* <div className="card col-md-11 m-3 p-3 position-relative">
                        <div className="card-body">
                           <h5 className="card-title">Choice Service</h5>
                           <p className="card-text">Service info</p>
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
                     </div> */}
                  </>
               )}
            </div>
         </div>
      </section>
   );
}

export default NewOrder;
