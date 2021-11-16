import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import CoinCard from "../../components/CoinCard";
import loader from "../../assets/loader.svg";
import "./styles.css";

function Homepage() {
  const history = useHistory();
  const [query, setQuery] = useState(null);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const raw = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const parsed = await raw.json();
      setCoins(parsed);
      setIsLoading(false);
    })();
  }, []);

  const fetchCoins = async (page = 1) => {
    setIsLoading(true);
    const raw = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
    );
    const parsed = await raw.json();
    setCoins([...coins, ...parsed]);
    setIsLoading(false);
  };

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
      <InfiniteScroll pageStart={0} loadMore={fetchCoins} hasMore>
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
        {isLoading && <img className="loader" src={loader} alt="Loading..." />}
      </InfiniteScroll>
    </div>
  );
}

export default Homepage;
