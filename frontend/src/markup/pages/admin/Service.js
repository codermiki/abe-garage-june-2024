import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import ServiceList from "../../components/Admin/ServiceList/ServiceList";
import { useAuth } from "../../../Contexts/AuthContext";
import LoginForm from "../../components/LoginForm/LoginForm";

function Service() {
   const { isLogged, isAdmin } = useAuth();

   if (isLogged) {
      if (isAdmin) {
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
                        <ServiceList />
                     </div>
                  </div>
               </div>
            </div>
         );
      } else {
         return (
            <div>
               <h1>You are not authorized to access this page</h1>
            </div>
         );
      }
   } else {
      return (
         <div>
            <LoginForm />
         </div>
      );
   }
}

export default Service;
