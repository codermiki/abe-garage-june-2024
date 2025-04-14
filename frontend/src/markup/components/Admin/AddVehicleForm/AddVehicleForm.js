import React, { useState } from "react";

function AddVehicleForm() {
   const [customer_id, setCustomerId] = useState("");
   const [vehicle_year, setVehicleYear] = useState("");
   const [vehicle_make, setVehicleMake] = useState("");
   const [vehicle_model, setVehicleModel] = useState("");
   const [vehicle_type, setVehicleType] = useState("");
   const [vehicle_mileage, setVehicleMileage] = useState("");
   const [vehicle_tag, setVehicleTag] = useState("");
   const [vehicle_serial, setVehicleSerial] = useState("");
   const [vehicle_color, setVehicleColor] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = async (event) => {
      event.preventDefault();

      const vehicleData = {
         customer_id: parseInt(customer_id),
         vehicle_year: parseInt(vehicle_year),
         vehicle_make,
         vehicle_model,
         vehicle_type,
         vehicle_mileage,
         vehicle_tag,
         vehicle_serial,
         vehicle_color,
      };

      try {
         const response = await fetch("http://localhost:8080/api/vehicle", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               
            },
            body: JSON.stringify(vehicleData),
         });

         if (!response.ok) {
            throw new Error("Failed to add vehicle");
         }

         alert("Vehicle added successfully!");
      } catch (err) {
         setError(err.message);
      }
   };

   return (
      <div>
         <div className="bg-white shadow-sm p-3 mb-3 rounded width-100">
            <div className="row clearfix">
               <div className="form-column col-lg-7">
                  <div className="inner-column">
                     <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                           <div className="row clearfix">
                              <div className="form-group col-md-12">
                                 <input
                                    type="number"
                                    name="customer_id"
                                    value={customer_id}
                                    onChange={(event) =>
                                       setCustomerId(event.target.value)
                                    }
                                    placeholder="Customer ID"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="number"
                                    name="vehicle_year"
                                    value={vehicle_year}
                                    onChange={(event) =>
                                       setVehicleYear(event.target.value)
                                    }
                                    placeholder="Vehicle Year"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_make"
                                    value={vehicle_make}
                                    onChange={(event) =>
                                       setVehicleMake(event.target.value)
                                    }
                                    placeholder="Vehicle Make"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_model"
                                    value={vehicle_model}
                                    onChange={(event) =>
                                       setVehicleModel(event.target.value)
                                    }
                                    placeholder="Vehicle Model"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_type"
                                    value={vehicle_type}
                                    onChange={(event) =>
                                       setVehicleType(event.target.value)
                                    }
                                    placeholder="Vehicle Type"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_mileage"
                                    value={vehicle_mileage}
                                    onChange={(event) =>
                                       setVehicleMileage(event.target.value)
                                    }
                                    placeholder="Vehicle Mileage"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_tag"
                                    value={vehicle_tag}
                                    onChange={(event) =>
                                       setVehicleTag(event.target.value)
                                    }
                                    placeholder="Vehicle Tag"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_serial"
                                    value={vehicle_serial}
                                    onChange={(event) =>
                                       setVehicleSerial(event.target.value)
                                    }
                                    placeholder="Vehicle Serial"
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <input
                                    type="text"
                                    name="vehicle_color"
                                    value={vehicle_color}
                                    onChange={(event) =>
                                       setVehicleColor(event.target.value)
                                    }
                                    placeholder="Vehicle Color"
                                 />
                              </div>
                              {error && (
                                 <div className="validation-error" role="alert">
                                    {error}
                                 </div>
                              )}
                              <div className="form-group col-md-12">
                                 <button
                                    className="theme-btn btn-style-one"
                                    type="submit"
                                    data-loading-text="Please wait..."
                                 >
                                    <span>Add Vehicle</span>
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
   );
}

export default AddVehicleForm;
