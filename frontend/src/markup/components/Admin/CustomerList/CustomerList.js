// Import the necessary components
import React, { useState, useEffect } from "react";
import { FaEdit, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { Table } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the customer service
import customerService from "../../../../services/customer.service";
import { Link, useLocation } from "react-router-dom";
import { LuPointer } from "react-icons/lu";

// Create the CustomersList component
const CustomersList = () => {
   const location = useLocation();
   // Create all the states we need to store the data
   const [customers, setCustomers] = useState([]);
   const [apiError, setApiError] = useState(false);
   const [apiErrorMessage, setApiErrorMessage] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [displayData, setDisplayData] = useState(customers);
   const [searchResults, setSearchResults] = useState([]);
   const [serverError, setServerError] = useState(null);

   // Get the logged-in employee token
   const { employee } = useAuth();
   const token = employee?.employee_token;

   useEffect(() => {
      if (token) {
         customerService
            .getAllCustomers(token)
            .then((res) => {
               if (!res.ok) {
                  setApiError(true);
                  setApiErrorMessage(
                     res.status === 401
                        ? "Please login again"
                        : res.status === 403
                        ? "You are not authorized to view this page"
                        : "Please try again later"
                  );
                  throw new Error(`HTTP error! Status: ${res.status}`);
               }
               return res.json();
            })
            .then((res) => res.data) // Extract data from the response
            .then((data) => {
               if (data?.customers?.length) {
                  setCustomers(data.customers);
                  setDisplayData(data.customers); // Set the initial display data to all customers
               } else {
                  setCustomers([]); // Handle empty response properly
               }
            })
            .catch(() => {
               setApiError(true);
               setApiErrorMessage(
                  "An error occurred while fetching customers."
               );
            });
      }
   }, [employee]); // Dependency ensures useEffect runs when employee changes

   const handleSearch = (e) => {
      e.preventDefault();

      if (!searchQuery) {
         setDisplayData(customers);
         setServerError("Search query is required");
         return;
      }

      customerService
         .searchCustomer(searchQuery, token)
         .then((response) => response.json())
         .then((data) => {
            if (data.error) {
               setDisplayData(customers);
               setServerError(data.error);
               setSearchResults([]);
            } else {
               // setSearchResults(data?.data || []);
               setDisplayData(data?.data || []);
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
      <>
         {apiError ? (
            <section className="contact-section">
               <div className="auto-container">
                  <div className="contact-title">
                     <h2>{apiErrorMessage}</h2>
                  </div>
               </div>
            </section>
         ) : (
            <section className="contact-section">
               <div className="auto-container">
                  <div className="contact-title">
                     <h2>Customers</h2>
                  </div>
                  <form onSubmit={handleSearch}>
                     <div className="row clearfix">
                        <div className="form-group col-md-12 position-relative d-flex ">
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
                     </div>
                  </form>
                  <Table striped bordered hover>
                     <thead>
                        <tr>
                           <th>ID</th>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Email</th>
                           <th>Phone</th>
                           <th>Added Date</th>
                           <th>Active</th>
                           <th>Edit</th>
                        </tr>
                     </thead>
                     <tbody>
                        {displayData?.length > 0 ? (
                           displayData?.map((customer) => (
                              <tr key={customer?.customer_id}>
                                 <td>{customer?.customer_id}</td>
                                 <td>{customer?.customer_first_name}</td>
                                 <td>{customer?.customer_last_name}</td>
                                 <td>{customer?.customer_email}</td>
                                 <td>{customer?.customer_phone_number}</td>
                                 <td>
                                    {format(
                                       new Date(customer?.customer_added_date),
                                       "MM - dd - yyyy | kk:mm"
                                    )}
                                 </td>
                                 <td>
                                    {customer?.active_customer_status
                                       ? "Yes"
                                       : "No"}
                                 </td>
                                 <td>
                                    <div className="edit-delete-icons">
                                       <Link
                                          to={`/admin/customers/edit/${customer?.customer_id}`}
                                          state={{ from: location.pathname }}
                                       >
                                          <FaEdit />
                                       </Link>

                                       <Link
                                          to={`/admin/customers/profile/${customer?.customer_id}`}
                                       >
                                          <FaExternalLinkAlt />
                                       </Link>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan="8" className="text-center">
                                 No customers found.
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </Table>
               </div>
            </section>
         )}
      </>
   );
};

// Export the CustomersList component
export default CustomersList;
