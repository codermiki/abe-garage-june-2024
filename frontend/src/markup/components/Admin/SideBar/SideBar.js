import React from "react";
import "./SideBar.css"; // Import the CSS file for styling
const SideBar = ({ text }) => {
   return (
      <div
         className="d-flex flex-column align-items-center bg-light p-4"
         style={{ width: "150px", height: "100%" }}
      >
         <div className="sidebar-circle mb-4">{text}</div>
         <div className="d-flex flex-column align-items-center h-100">
            <div className="sidebar-line"></div>
         </div>
      </div>
   );
};

export default SideBar;
