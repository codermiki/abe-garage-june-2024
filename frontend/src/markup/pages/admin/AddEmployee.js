import React from "react";
// Import the AddEmployeeForm component
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

function AddEmployee(props) {
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
                  <AddEmployeeForm />
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddEmployee;
