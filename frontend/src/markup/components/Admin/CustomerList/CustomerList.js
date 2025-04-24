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
import { ClipLoader } from "react-spinners";

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
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);

   const customerPerPage = 5; // Number of customers to display per page
   const indexOfLastCustomer = currentPage * customerPerPage; // Index of the last customer on the current page
   const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage; // Index of the first customer on the current page
   const currentCustomers = displayData.slice(
      indexOfFirstCustomer,
      indexOfLastCustomer
   );

   const totalPages = Math.ceil(displayData.length / customerPerPage); // Total number of pages

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
   // Get the logged-in employee token
   const { employee } = useAuth();
   const token = employee?.employee_token;

   useEffect(() => {
      if (token) {
         setLoading(true); // Set loading to true when fetching data
         customerService
            .getAllCustomers(token)
            .then((res) => {
               if (!res.ok) {
                  setLoading(false); // Set loading to false if there is an error
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
                  setLoading(false); // Set loading to false after data is fetched
                  setCustomers(data.customers);
                  setDisplayData(data.customers); // Set the initial display data to all customers
               } else {
                  setLoading(false); // Set loading to false if no customers are found
                  setCustomers([]); // Handle empty response properly
               }
            })
            .catch(() => {
               setLoading(false); // Set loading to false if there is an error
               setApiError(true);
               setApiErrorMessage(
                  "An error occurred while fetching customers."
               );
            });
      }
   }, [employee]); // Dependency ensures useEffect runs when employee changes

   const handleSearch = (e) => {
      e.preventDefault();
      setLoading(true); // Set loading to true when searching
      setCurrentPage(1); // Reset to the first page when searching

      if (!searchQuery) {
         setLoading(false); // Set loading to false if search query is empty
         setDisplayData(customers);
         setServerError("Search query is required");
         return;
      }

      customerService
         .searchCustomer(searchQuery, token)
         .then((response) => response.json())
         .then((data) => {
            if (data.error) {
               setLoading(false); // Set loading to false if there is an error
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
               setLoading(false); // Set loading to false after search is complete
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
            setLoading(false); // Set loading to false if there is an error
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
               <div className="auto-container p-0 m-0">
                  <div className="contact-title p-0 m-0">
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

                  {loading ? (
                     <div className="text-center h-100 d-flex justify-content-center align-items-center">
                        <ClipLoader
                           color="#36d7b7"
                           loading={loading}
                           size={50}
                        />
                     </div>
                  ) : (
                     <>
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
                              {currentCustomers?.length > 0 ? (
                                 currentCustomers?.map((customer) => (
                                    <tr key={customer?.customer_id}>
                                       <td>{customer?.customer_id}</td>
                                       <td>{customer?.customer_first_name}</td>
                                       <td>{customer?.customer_last_name}</td>
                                       <td>{customer?.customer_email}</td>
                                       <td>
                                          {customer?.customer_phone_number}
                                       </td>
                                       <td>
                                          {format(
                                             new Date(
                                                customer?.customer_added_date
                                             ),
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
                                                state={{
                                                   from: location.pathname,
                                                }}
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
                     </>
                  )}
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
               </div>
            </section>
         )}
      </>
   );
};

// Export the CustomersList component
export default CustomersList;
