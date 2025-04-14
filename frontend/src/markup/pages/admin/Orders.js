import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const Orders = () => {
   return (
      <div>
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
                     <div className="text-center">Orders page</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Orders;
