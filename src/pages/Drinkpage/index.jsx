import React, { useState, useEffect } from "react";

import "./styles.css";

function Drinkpage() {
  const [drinkInfo, setDrinkInfo] = useState({});

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"
      );
      let parsedResponse = await response.json();
      console.log(parsedResponse);
      setDrinkInfo(parsedResponse.drinks[0]);
    })();
  }, []); //eslint-disable-line

  return (
    <div className="drinkpageContainer">
      <div className="logoDiv">
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="logo"
        />
      </div>
      <input type="text" className="searchbar" placeholder="Search..." />
      <div className="drinkpageHeader">
        <img src={drinkInfo.strDrinkThumb} alt="cover" className="drinkCover" />
        <div className="drinkpageHeaderText">
          <h1 className="drinkTitle">{drinkInfo.strDrink}</h1>
          <h3 className="drinkCategory">{drinkInfo.strCategory}</h3>
        </div>
      </div>

      <div className="ingredientsContainer">
        <h3 className="sectionTitle">Ingredients:</h3>
      </div>
    </div>
  );
}

export default Drinkpage;
