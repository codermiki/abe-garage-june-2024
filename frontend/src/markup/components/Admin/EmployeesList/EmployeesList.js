// Import the necessary components
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table, Button } from "react-bootstrap";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import employeeService from "../../../../services/employee.service";
import { Link, useLocation } from "react-router-dom";

const EmployeesList = () => {
   const location = useLocation();
   const [employees, setEmployees] = useState([]);
   const [apiError, setApiError] = useState(false);
   const [apiErrorMessage, setApiErrorMessage] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   const { employee } = useAuth();
   let token = employee ? employee.employee_token : null;

   useEffect(() => {
      fetchEmployees();
   }, []);

   const fetchEmployees = () => {
      employeeService
         .getAllEmployees(token)
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
               setEmployees(data.data);
            }
         })
         .catch(() => setApiErrorMessage("Error fetching employees"));
   };

   const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this employee?")) {
         employeeService
            .deleteEmployee(id, token)
            .then((res) => {
               if (!res.ok) {
                  alert("Failed to delete employee");
               }
               setEmployees(employees.filter((emp) => emp.employee_id !== id));
            })
            .catch(() => alert("Error deleting employee"));
      }
   };

   const employeePerPage = 5; // Number of employees to display per page
   const indexOfLastEmployee = currentPage * employeePerPage; // Index of the last employee on the current page
   const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage; // Index of the first employee on the current page
   const currentEmployees = employees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
   );

   const totalPages = Math.ceil(employees.length / employeePerPage); // Total number of pages

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
               <div className="auto-container p-0 m-0">
                  <div className="contact-title p-0 m-0">
                     <h2>Employees</h2>
                  </div>
                  {/* Employee List */}
                  <Table striped bordered hover>
                     <thead>
                        <tr>
                           <th>Active</th>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Email</th>
                           <th>Phone</th>
                           <th>Added Date</th>
                           <th>Role</th>
                           <th>Edit/Delete</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentEmployees?.map((employee) => (
                           <tr key={employee.employee_id}>
                              <td>{employee.active_employee ? "Yes" : "No"}</td>
                              <td>{employee.employee_first_name}</td>
                              <td>{employee.employee_last_name}</td>
                              <td>{employee.employee_email}</td>
                              <td>{employee.employee_phone}</td>
                              <td>
                                 {format(
                                    new Date(employee.added_date),
                                    "MM-dd-yyyy | HH:mm"
                                 )}
                              </td>
                              <td>{employee.company_role_name}</td>
                              <td>
                                 <div className="edit-delete-icons">
                                    <Link
                                       to={`/admin/employees/edit/${employee.employee_id}`}
                                       state={{ from: location.pathname }}
                                       className="m-2"
                                    >
                                       <FaEdit />
                                    </Link>

                                    <Button
                                       variant="danger"
                                       size="sm"
                                       onClick={() =>
                                          handleDelete(employee.employee_id)
                                       }
                                    >
                                       <MdDelete />
                                    </Button>
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

export default EmployeesList;
