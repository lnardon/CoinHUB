import React from "react";

import "./styles.css";

function Homepage() {
  return (
    <div className="homepageContainer">
      <div className="logoDiv">
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="logo"
        />
      </div>
      <input type="text" className="searchbar" placeholder="Search..." />
    </div>
  );
}

export default Homepage;
