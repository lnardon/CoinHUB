import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CoinCard from "../../components/CoinCard";
import "./styles.css";

function Homepage() {
  const history = useHistory();
  const [query, setQuery] = useState(null);
  const [coins, setCoins] = useState(null);

  useEffect(() => {
    (async () => {
      const raw = await fetch(process.env.REACT_APP_TOP_COINS_API_URL);
      const parsed = await raw.json();
      setCoins(parsed);
      console.log(parsed);
    })();
  }, []);

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
      <div className="listContainer">
        {coins &&
          coins.map((coin, index) => {
            return (
              <CoinCard
                key={index}
                icon={coin.image}
                name={coin.name}
                price={coin.current_price}
                variation={coin.price_change_percentage_24h}
                coinId={coin.id}
                lowestPrice={coin.low_24h}
                highestPrice={coin.high_24h}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Homepage;
