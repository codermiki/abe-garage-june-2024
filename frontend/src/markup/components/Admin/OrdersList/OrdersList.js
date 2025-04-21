// Import the necessary components
import React, { useState, useEffect } from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table, Button } from "react-bootstrap";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import orderService from "../../../../services/order.service";
import { Link, useLocation } from "react-router-dom";

const OrdersList = () => {
   const location = useLocation();
   const [orders, setOrders] = useState([]);
   const [apiError, setApiError] = useState(false);
   const [apiErrorMessage, setApiErrorMessage] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   const { employee } = useAuth();
   let token = employee ? employee.employee_token : null;

   useEffect(() => {
      fetchOrders();
   }, []);

   const fetchOrders = () => {
      orderService
         .getAllOrders(token)
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
            }
            return res.json();
         })
         .then((data) => {
            if (data.data.length !== 0) {
               setOrders(data.data);
            }
         })
         .catch(() => setApiErrorMessage("Error fetching orders"));
   };

   const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this order?")) {
         orderService
            .deleteOrder(id, token)
            .then((res) => {
               if (!res.ok) {
                  alert("Failed to delete order");
               }
               setOrders(orders.filter((order) => order.order_id !== id));
            })
            .catch(() => alert("Error deleting order"));
      }
   };

   // sample data for testing
   const ordersData = [
      {
         order_id: 1,
         customer: [
            {
               customer_id: 1,
               customer_first_name: "John",
               customer_last_name: "Doe",
               customer_email: "example@gmail.com",
               customer_phone: "123-456-7890",
            },
         ],
         vehicle: [
            {
               vehicle_id: 1,
               vehicle_make: "Toyota",
               vehicle_model: "Camry",
               vehicle_year: 2020,
               vehicle_serial_number: "1234567890",
            },
         ],
         order_date: "2023-10-01T12:00:00Z",
         received_by: "Jane Smith",
         status: "Completed",
      },
      {
         order_id: 2,
         customer: [
            {
               customer_id: 1,
               customer_first_name: "John",
               customer_last_name: "Doe",
               customer_email: "example@gmail.com",
               customer_phone: "123-456-7890",
            },
         ],
         vehicle: [
            {
               vehicle_id: 1,
               vehicle_make: "Toyota",
               vehicle_model: "Camry",
               vehicle_year: 2020,
               vehicle_serial_number: "1234567890",
            },
         ],
         order_date: "2023-10-01T12:00:00Z",
         received_by: "Jane Smith",
         status: "Completed",
      },
      {
         order_id: 3,
         customer: [
            {
               customer_id: 1,
               customer_first_name: "John",
               customer_last_name: "Doe",
               customer_email: "example@gmail.com",
               customer_phone: "123-456-7890",
            },
         ],
         vehicle: [
            {
               vehicle_id: 1,
               vehicle_make: "Toyota",
               vehicle_model: "Camry",
               vehicle_year: 2020,
               vehicle_serial_number: "1234567890",
            },
         ],
         order_date: "2023-10-01T12:00:00Z",
         received_by: "Jane Smith",
         status: "Completed",
      },
   ];

   const orderPerPage = 5; // Number of customers to display per page
   const indexOfLastOrder = currentPage * orderPerPage; // Index of the last customer on the current page
   const indexOfFirstOrder = indexOfLastOrder - orderPerPage; // Index of the first customer on the current page
   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

   const totalPages = Math.ceil(orders.length / orderPerPage); // Total number of pages

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
                     <h2>Orders</h2>
                  </div>
                  {/* Orders List */}
                  <Table striped bordered hover>
                     <thead>
                        <tr>
                           <th>Order ID</th>
                           <th>Customer</th>
                           <th>Vehicle</th>
                           <th>Order Date</th>
                           <th>Received By</th>
                           <th>Order Status</th>
                           <th>Edit/View</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentOrders?.map((order) => (
                           <tr key={order.order_id}>
                              <td>{order.order_id}</td>
                              <td>
                                 <div key={order.customer_id}>
                                    {order.customer_first_name}{" "}
                                    {order.customer_last_name}
                                    <br />
                                    {order.customer_email}
                                    <br />
                                    {order.customer_phone_number}
                                 </div>
                              </td>
                              <td>
                                 <div key={order.vehicle_id}>
                                    {order.vehicle_make} {order.vehicle_model}{" "}
                                    <br />
                                    {order.vehicle_year}
                                    <br />
                                    {order.vehicle_serial}
                                 </div>
                              </td>
                              <td>
                                 {format(
                                    new Date(order.order_date),
                                    "MM-dd-yyyy | HH:mm"
                                 )}
                              </td>
                              <td>
                                 {order.employee_first_name}{" "}
                                 {order.employee_last_name}
                              </td>
                              <td>
                                 {order.order_status ? (
                                    <>
                                       <span id="completed">Completed</span>
                                    </>
                                 ) : (
                                    <>
                                       <span id="in_progress">In progress</span>
                                    </>
                                 )}
                              </td>
                              <td>
                                 <div className="edit-delete-icons">
                                    <Link
                                       to={`/admin/orders/edit/${order.order_id}`}
                                       state={{ from: location.pathname }}
                                       className="m-2"
                                    >
                                       <FaEdit />
                                    </Link>

                                    <Link
                                       to={`/admin/orders/${order.order_id}`}
                                    >
                                       <FaExternalLinkAlt />
                                    </Link>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
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

export default OrdersList;
