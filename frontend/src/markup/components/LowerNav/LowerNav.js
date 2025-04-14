import React from "react";

function LowerNav({title, path }) {
   return (
      <>
         <div className="lower-nav">
            <div className="p-5 ml-5">
               <h1 className="text-white">{title}</h1>
               <p className="text-white">
                  <span
                     style={{
                        color: "orange",
                     }}
                  >
                     Home
                  </span>{" "}
                  &gt; {path}
               </p>
            </div>
         </div>
      </>
   );
}

export default LowerNav;
