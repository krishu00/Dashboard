import React from "react";
// import "../CSSComponent/Navbar.css";
import "../Navbar/Navbar.css"


const NavBar = (props) => {
  return (
    <div className="NavBar">
      <div className="logo">
       
        <h2> <span><img src={require("../Navbar/DElog.jpg")} alt="#" /></span> 
        {/* Daksh */}
         </h2>
      </div>
      <div className="heading">
        <h3> Executive Sales Dashboard </h3>
      </div>
    </div>
  );
};

export default NavBar;
