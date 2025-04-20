import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditEmployeeForm from "../../components/Admin/EditEmployeeForm/EditEmployeeForm";
import { useLocation } from "react-router";

function EditEmployee() {
   const location = useLocation();
   const from = location.state?.from || "/"; // Default to "/admin/employees" if no state is provided
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
                  <EditEmployeeForm from={from} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditEmployee;
