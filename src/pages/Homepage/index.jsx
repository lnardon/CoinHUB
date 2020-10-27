import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Homepage() {
  const history = useHistory();
  const [query, setQuery] = useState(null);

  return (
    <div className="homepageContainer">
      <div className="logoDiv">
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="logo"
        />
      </div>
      <input
        type="text"
        className="searchbar"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            history.push(`/coin/${query}`);
          }
        }}
      />
    </div>
  );
}

export default Homepage;
