import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import SideBar from "../SideBar/SideBar";
import AddVehicleForm from "../AddVehicleForm/AddVehicleForm";

function CustomerProfile() {
   // Dummy data for vehicles
   const vehicles = [
      {
         id: 1,
         name: "Toyota Camry",
         model: "2020",
         plate: "ABC1234",
         description: "A reliable sedan with great fuel efficiency.",
      },
      {
         id: 2,
         name: "Honda Accord",
         model: "2019",
         plate: "XYZ5678",
         description: "A spacious sedan with advanced safety features.",
      },
      {
         id: 3,
         name: "Ford F-150",
         model: "2021",
         plate: "LMN9012",
         description: "A powerful pickup truck for all your hauling needs.",
      },
   ];
   // Dummy data for orders
   const orders = [
      {
         id: 1,
         date: "2023-10-01",
         status: "Completed",
         total: "$100.00",
      },
      {
         id: 2,
         date: "2023-10-05",
         status: "Pending",
         total: "$50.00",
      },
      {
         id: 3,
         date: "2023-10-10",
         status: "Cancelled",
         total: "$75.00",
      },
   ];

   // state for vehicles
   const [vehicleList, setVehicleList] = useState(vehicles);
   // state for orders
   const [orderList, setOrderList] = useState(orders);

   return (
      <div className="row w-100">
         <div className="p-4 flex-grow-1">
            {/* display customer profile */}
            <div className="d-flex flex-column flex-md-row">
               <SideBar text={"Info"} />
               <div className="container-fluid mb-4">
                  <h4 className="fw-bold mb-3">Customer: Adugna Bekele</h4>
                  <p>
                     <strong>Email:</strong>
                     <span className="text-muted">test@evangadi.com</span>
                  </p>
                  <p>
                     <strong>Phone Number:</strong>
                     <span className="text-muted">2023862702</span>
                  </p>
                  <p>
                     <strong>Active Customer:</strong>
                     <span className="text-muted">Yes</span>
                  </p>
                  <p>
                     <strong>Edit customer info:</strong>{" "}
                     <FaEdit color="red" role="button" />
                  </p>
               </div>
            </div>

            {/* display vehicle of customer */}
            <div className="d-flex flex-column flex-md-row">
               <SideBar text={"Cars"} />
               <div className="col-11 container-fluid mb-4">
                  <h4 className="fw-bold mt-4">Vehicles of Adugna</h4>
                  {vehicleList.length > 0 ? (
                     vehicleList.map((vehicle) => (
                        <div
                           key={vehicle.id}
                           className="bg-white shadow-sm p-3 mb-3 rounded"
                        >
                           <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-column">
                                 <h5 className="fw-bold">{vehicle.name}</h5>
                                 <p className="text-muted">{vehicle.model}</p>
                              </div>
                              <div className="d-flex align-items-center p-2">
                                 <p className="text-muted m-1">
                                    {vehicle.plate}
                                 </p>

                                 <FaEdit
                                    color="red"
                                    role="button"
                                    className="ms-3 m-1 cursor-pointer"
                                 />

                                 <FaWindowClose
                                    color="red"
                                    role="button"
                                    className="ms-3 m-1"
                                 />
                              </div>
                           </div>
                           <p className="text-muted">{vehicle.description}</p>
                        </div>
                     ))
                  ) : (
                     <div className="bg-white shadow-sm p-3 mb-3 rounded width-100">
                        No vehicle found
                     </div>
                  )}

                  {/* create add vehicle form */}

                  {<AddVehicleForm />}

                  <Button variant="danger">ADD NEW VEHICLE</Button>
               </div>
            </div>

            {/* display orders of customer */}
            <div className="d-flex flex-column flex-md-row">
               <SideBar text={"Orders"} />
               <div className="col-11 container-fluid mb-4">
                  <h4 className="fw-bold mt-4">Orders of Adugna</h4>
                  {!orderList.length > 0 ? (
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
