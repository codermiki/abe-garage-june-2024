import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditCustomerForm from "../../components/Admin/EditCustomerForm/EditCustomerForm";
import { useLocation, useNavigate } from "react-router";

function EditCustomer() {
   const location = useLocation();
   const from = location?.state?.from || "/";
   return (
      <div>
         <div className="container-fluid admin-pages">
            <div className="row">
               <div
                  style={{
                     // make the menu scrollable
                     overflowY: "scroll",
                     height: "80vh",
                  }}
                  className="col-md-2 admin-left-side"
               >
                  <AdminMenu />
               </div>
               <div
                  style={{
                     // make the menu scrollable
                     overflowY: "scroll",
                     height: "80vh",
                  }}
                  className="col-md-10 admin-right-side"
               >
                  <EditCustomerForm from={from} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditCustomer;

// old code for EditCustomer component
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

// const EditCustomer = () => {
//    const { id } = useParams();
//    const navigate = useNavigate();
//    const [customer, setCustomer] = useState({
//       customer_id: "",
//       customer_phone_number: "",
//       customer_first_name: "",
//       customer_last_name: "",
//       active_customer_status: "",
//    });

//    useEffect(() => {
//       if (id) {
//          const token = localStorage.getItem("token");
//          fetch(`http://localhost:8080/api/customer/${id}`, {
//             headers: {
//                Authorization: `Bearer ${token}`,
//             },
//          })
//             .then((res) => res.json())
//             .then((data) => setCustomer(data))
//             .catch((err) => console.error("Error fetching customer:", err));
//       }
//    }, [id]);

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setCustomer((prev) => ({ ...prev, [name]: value }));
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const token = localStorage.getItem("token");
//          const response = await fetch("http://localhost:8080/api/customer", {
//             method: "PUT",
//             headers: {
//                "Content-Type": "application/json",
//                Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(customer),
//          });

//          if (response.ok) {
//             alert("Customer updated successfully!");
//             navigate("/customers");
//          } else {
//             alert("Failed to update customer");
//          }
//       } catch (error) {
//          console.error("Error updating customer:", error);
//       }
//    };

//    return (
//       <div className="container-fluid admin-pages">
//          <div className="row">
//             <div
//                style={{
//                   overflowY: "scroll",
//                   height: "80vh",
//                }}
//                className="col-md-2 admin-left-side"
//             >
//                <AdminMenu />
//             </div>
//             <div
//                style={{
//                   overflowY: "scroll",
//                   height: "80vh",
//                }}
//                className="col-md-10 admin-right-side d-flex justify-content-center align-items-center"
//             >
//                <div className="card p-4 shadow-lg" style={{ width: "50%" }}>
//                   <h2 className="text-center mb-4">Edit Customer</h2>
//                   <form onSubmit={handleSubmit}>
//                      <div className="mb-3">
//                         <label className="form-label">Phone Number</label>
//                         <input
//                            type="text"
//                            name="customer_phone_number"
//                            value={customer.customer_phone_number}
//                            onChange={handleChange}
//                            className="form-control"
//                         />
//                      </div>
//                      <div className="mb-3">
//                         <label className="form-label">First Name</label>
//                         <input
//                            type="text"
//                            name="customer_first_name"
//                            value={customer.customer_first_name}
//                            onChange={handleChange}
//                            className="form-control"
//                         />
//                      </div>
//                      <div className="mb-3">
//                         <label className="form-label">Last Name</label>
//                         <input
//                            type="text"
//                            name="customer_last_name"
//                            value={customer.customer_last_name}
//                            onChange={handleChange}
//                            className="form-control"
//                         />
//                      </div>
//                      <div className="mb-3">
//                         <label className="form-label">Active Status</label>
//                         <input
//                            type="number"
//                            name="active_customer_status"
//                            value={customer.active_customer_status}
//                            onChange={handleChange}
//                            className="form-control"
//                         />
//                      </div>
//                      <button
//                         type="submit"
//                         className="btn btn-primary w-100"
//                      >
//                         Update Customer
//                      </button>
//                   </form>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default EditCustomer;
