// Import the necessary components
import React, { useState, useEffect } from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the customer service
import customerService from "../../../../services/customer.service";
import { Link, useLocation } from "react-router-dom";

// Create the CustomersList component
const CustomersList = () => {
   const location = useLocation();
   // Create all the states we need to store the data
   const [customers, setCustomers] = useState([]);
   const [apiError, setApiError] = useState(false);
   const [apiErrorMessage, setApiErrorMessage] = useState(null);

   // Get the logged-in employee token
   const { employee } = useAuth();

   useEffect(() => {
      const token = employee?.employee_token; // Ensure the latest token is used

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
                        {customers.map((customer) => (
                           <tr key={customer.customer_id}>
                              <td>{customer.customer_id}</td>
                              <td>{customer.customer_first_name}</td>
                              <td>{customer.customer_last_name}</td>
                              <td>{customer.customer_email}</td>
                              <td>{customer.customer_phone_number}</td>
                              <td>
                                 {format(
                                    new Date(customer.customer_added_date),
                                    "MM - dd - yyyy | kk:mm"
                                 )}
                              </td>
                              <td>
                                 {customer.active_customer_status
                                    ? "Yes"
                                    : "No"}
                              </td>
                              <td>
                                 <div className="edit-delete-icons">
                                    <Link
                                       to={`/admin/customers/edit/${customer.customer_id}`}
                                       state={{ from: location.pathname }}
                                    >
                                       <FaEdit />
                                    </Link>

                                    <Link
                                       to={`/admin/customers/profile/${customer.customer_id}`}
                                    >
                                       <FaExternalLinkAlt />
                                    </Link>
                                 </div>
                              </td>
                           </tr>
                        ))}
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
