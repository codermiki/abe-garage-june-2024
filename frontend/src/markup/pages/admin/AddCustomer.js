import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddCustomerForm from "../../components/Admin/AddCustomerForm/AddCustomerForm";

function AddCustomer() {
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
                  <AddCustomerForm />
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddCustomer;
