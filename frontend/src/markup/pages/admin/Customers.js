import React from "react";
import CustomersList from "../../components/Admin/CustomerList/CustomerList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
const Customers = () => {
   return (
      <>
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
                     <CustomersList />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Customers;
