import React, { useState, useEffect } from "react";

import "./styles.css";

function Coinpage() {
  const [coinInfo, setCoinInfo] = useState({});

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}coin/allinfo/${
          window.location.pathname.split("/")[2]
        }`
      );
      let parsedResponse = await response.json();
      setCoinInfo(parsedResponse);
      console.log(parsedResponse);
    })();
  }, []);

  return (
    <div className="coinpageContainer">
      <div className="logoDiv">
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="logo"
        />
      </div>
      <div>
        <h1>{coinInfo.name}</h1>
      </div>
    </div>
  );
}

export default Coinpage;
