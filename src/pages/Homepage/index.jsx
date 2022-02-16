import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

import CoinCard from "../../components/CoinCard";
import Modal from "../../components/Modal";
import loader from "../../assets/loader.svg";
import "./styles.css";

function Homepage() {
  const pageRef = useRef();
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

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

  const handleCoinModal = async (id) => {
    const raw = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const parsed = await raw.json();
    console.log(parsed);
    setModalInfo(parsed);
    setOpenModal(true);
  };

  return (
    <div className="homepageContainer" ref={pageRef}>
      <div className="logoDiv">
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="logo"
        />
      </div>

      {openModal && (
        <Modal
          name={modalInfo.name}
          icon={modalInfo.image.small}
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          price={modalInfo.market_data.current_price.usd}
          variation={modalInfo.market_data.price_change_percentage_24h}
          coinId={modalInfo.id}
          lowestPrice={modalInfo.market_data.low_24h.usd}
          highestPrice={modalInfo.market_data.high_24h.usd}
          marketData={modalInfo.market_data}
        />
      )}
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
                  position={coin.market_cap_rank}
                  openCoinCard={handleCoinModal}
                  onClick={() => alert("SKRT")}
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
