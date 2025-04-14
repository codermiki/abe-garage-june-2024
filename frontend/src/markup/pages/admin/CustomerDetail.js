import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// Import the EmployeesList component
import CustomerProfile from "../../components/Admin/CustomerProfile/CustomerProfile";
import SideBar from "../../components/Admin/SideBar/SideBar";
function CustomerDetail() {
   // Destructure the auth hook
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
                        <div className="d-flex">
                           <CustomerProfile />
                        </div>
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

export default CustomerDetail;
