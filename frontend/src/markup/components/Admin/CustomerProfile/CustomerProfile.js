import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import SideBar from "../SideBar/SideBar";
import AddVehicleForm from "../AddVehicleForm/AddVehicleForm";
import { useLocation, useParams } from "react-router";
import vehicleService from "../../../../services/vehicle.service";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";

function CustomerProfile() {
   const location = useLocation();
   const { id } = useParams();
   const { employee } = useAuth();
   const token = employee?.employee_token;
   // Dummy data for vehicles
   // const vehicles = [
   //    {
   //       id: 1,
   //       name: "Toyota Camry",
   //       model: "2020",
   //       plate: "ABC1234",
   //       description: "A reliable sedan with great fuel efficiency.",
   //    },
   //    {
   //       id: 2,
   //       name: "Honda Accord",
   //       model: "2019",
   //       plate: "XYZ5678",
   //       description: "A spacious sedan with advanced safety features.",
   //    },
   //    {
   //       id: 3,
   //       name: "Ford F-150",
   //       model: "2021",
   //       plate: "LMN9012",
   //       description: "A powerful pickup truck for all your hauling needs.",
   //    },
   // ];
   // // Dummy data for orders
   // const orders = [
   //    {
   //       id: 1,
   //       date: "2023-10-01",
   //       status: "Completed",
   //       total: "$100.00",
   //    },
   //    {
   //       id: 2,
   //       date: "2023-10-05",
   //       status: "Pending",
   //       total: "$50.00",
   //    },
   //    {
   //       id: 3,
   //       date: "2023-10-10",
   //       status: "Cancelled",
   //       total: "$75.00",
   //    },
   // ];
   // state for fetch controller
   const [fetchController, setFetchController] = useState(false);
   // state for customer profile
   const [customer, setCustomer] = useState([]);
   // state for vehicles
   const [vehicleList, setVehicleList] = useState([]);
   // state for orders
   const [orderList, setOrderList] = useState([]);
   // state for add vehicles
   const [addFormDisplay, setAddFormDisplay] = useState(false);

   // fetch vehicles and orders of the single customer using customer id from the server
   useEffect(() => {
      const fetchData = async () => {
         try {
            // fetch vehicles
            const vehicleResponse =
               await vehicleService.getVehiclesByCustomerId(id, token);
            const vehicleData = await vehicleResponse.json();
            setVehicleList(vehicleData.data);
            // fetch orders
            const orderResponse = await orderService.getOrdersByCustomerId(
               id,
               token
            );
            const orderData = await orderResponse.json();
            setOrderList(orderData.data);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchData();
   }, [fetchController]);

   // fetch customer profile using customer id from the server
   useEffect(() => {
      const fetchCustomerProfile = async () => {
         try {
            const response = await customerService.getCustomerById(id, token);
            const data = await response.json();
            setCustomer(data.data);
         } catch (error) {
            console.error("Error fetching customer profile:", error);
         }
      };

      fetchCustomerProfile();
   }, []);

   return (
      <div className="row w-100">
         <div className="p-4 flex-grow-1">
            {/* display customer profile */}
            <div className="d-flex flex-column flex-md-row">
               <SideBar text={"Info"} />
               <div className="container-fluid mb-4">
                  <h4 className="fw-bold mb-3">
                     Customer: {customer[0]?.customer_first_name}{" "}
                     {customer[0]?.customer_last_name}
                  </h4>
                  <p>
                     <strong>Email:</strong>
                     <span className="text-muted">
                        {customer[0]?.customer_email}
                     </span>
                  </p>
                  <p>
                     <strong>Phone Number:</strong>
                     <span className="text-muted">
                        {customer[0]?.customer_phone_number}
                     </span>
                  </p>
                  <p>
                     <strong>Active Customer:</strong>
                     <span className="text-muted">
                        {customer[0]?.active_customer_status ? "Yes" : "No"}
                     </span>
                  </p>
                  <p>
                     <strong>Edit customer info:</strong>{" "}
                     <Link
                        to={`/admin/customers/edit/${customer[0]?.customer_id}`}
                        state={{ from: location.pathname }}
                     >
                        <FaEdit color="red" role="button" />
                     </Link>
                  </p>
               </div>
            </div>

            {/* display vehicle of customer */}
            <div className="d-flex flex-column flex-md-row">
               <SideBar text={"Cars"} />
               <div className="col-11 container-fluid mb-4">
                  <h4 className="fw-bold mt-4">
                     Vehicles of {customer[0]?.customer_first_name}
                  </h4>
                  {vehicleList?.length > 0 ? (
                     vehicleList?.map((vehicle) => (
                        <div
                           key={vehicle?.vehicle_id}
                           className="bg-white shadow-sm p-3 mb-3 rounded"
                        >
                           <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-column">
                                 <h5 className="fw-bold">
                                    {vehicle?.vehicle_make}
                                 </h5>
                                 <p className="text-muted">
                                    {vehicle?.vehicle_model}
                                 </p>
                              </div>
                              <div className="d-flex align-items-center p-2">
                                 <p className="text-muted m-1">
                                    {vehicle?.vehicle_tag}
                                 </p>

                                 <FaEdit
                                    color="red"
                                    role="button"
                                    className="ms-3 m-1 cursor-pointer"
                                 />

                                 {/* <FaWindowClose
                                    color="red"
                                    role="button"
                                    className="ms-3 m-1"
                                 /> */}
                              </div>
                           </div>
                           <p className="text-muted">{vehicle.vehicle_color}</p>
                        </div>
                     ))
                  ) : (
                     <div className="bg-white shadow-sm p-3 mb-3 rounded width-100">
                        No vehicle found
                     </div>
                  )}

                  {/* create add vehicle form */}

                  {addFormDisplay && (
                     <AddVehicleForm
                        cust_id={id}
                        setAddFormDisplay={setAddFormDisplay}
                        setFetchController={setFetchController}
                     />
                  )}

                  {!addFormDisplay && (
                     <div className="form-group col-md-12">
                        <button
                           onClick={() => {
                              setAddFormDisplay((prev) => !prev);
                           }}
                           className="theme-btn btn-style-one"
                           type="submit"
                           data-loading-text="Please wait..."
                        >
                           <span>Add NEW VEHICLE</span>
                        </button>
                     </div>
                  )}
               </div>
            </div>

            {/* display orders of customer */}
            <div className="d-flex flex-column flex-md-row">
               <SideBar text={"Orders"} />
               <div className="col-11 container-fluid mb-4">
                  <h4 className="fw-bold mt-4">
                     Orders of {customer[0]?.customer_first_name}
                  </h4>
                  {!orderList?.length == 0 ? (
                     orderList.map((order) => (
                        <div
                           key={order.id}
                           className="bg-white shadow-sm p-3 mb-3 rounded"
                        >
                           <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-column">
                                 <h5 className="fw-bold">{order.date}</h5>
                                 <p className="text-muted">{order.status}</p>
                              </div>
                              <p className="text-muted">{order.total}</p>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="bg-white shadow-sm p-3 mb-3 rounded width-100">
                        No order found
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default CustomerProfile;
