import React from "react";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

function Admin() {
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
                  <Dashboard />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Admin;
