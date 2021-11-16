import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";

import { msToDate } from "../../utils/date";
import "./styles.css";

function Coinpage() {
  const history = useHistory();
  const [coinInfo, setCoinInfo] = useState(undefined);
  const [priceHistory, setPriceHistory] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}coin/allinfo/${
          window.location.pathname.split("/")[2]
        }`
      );
      let parsedResponse = await response.json();
      setCoinInfo(parsedResponse);

      response = await fetch(
        `${process.env.REACT_APP_API_URL}tweets/${
          window.location.pathname.split("/")[2]
        }`
      );
      parsedResponse = await response.json();
      setTweets(parsedResponse);

      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          window.location.pathname.split("/")[2]
        }/market_chart?vs_currency=usd&days=7/`
      );
      parsedResponse = await response.json();
      console.log(parsedResponse);
      setPriceHistory(parsedResponse.prices.map((data) => data));
    })();
  }, []);

  const fetchMarketData = async (days) => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${
        window.location.pathname.split("/")[2]
      }/market_chart?vs_currency=usd&days=${days}/`
    );
    let parsedResponse = await response.json();
    setPriceHistory(
      parsedResponse.prices
        .slice(
          parsedResponse.prices.length - 24,
          parsedResponse.prices.length - 1
        )
        .map((arr) => {
          arr[0] = msToDate(arr[0]);
          return arr;
        })
    );
  };

  const data = {
    labels: priceHistory.map((arr) => arr[0]),
    datasets: [
      {
        data: priceHistory,
        fill: true,
        backgroundColor:
          coinInfo?.market_data.price_change_percentage_24h > 0
            ? "rgb(23, 255, 100)"
            : "rgba(255, 25, 50,1)",
        borderColor: "rgba(0, 0, 0, 0.1)",
        pointRadius: 3,
        tension: 0.5,
      },
    ],
  };

  const options = {
    label: false,
    scales: {
      x: {
        startAtZero: false,
        ticks: {
          display: false,
        },
      },
      y: {
        startAtZero: false,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      {coinInfo && tweets ? (
        <div className="coinpageContainer">
          <div className="logoDiv">
            <img
              src={require("../../assets/logo.png")}
              alt="Logo"
              className="logo"
            />
          </div>

          <div className="backBtnDiv">
            <img
              src={require("../../assets/leftArrow.svg")}
              alt="back"
              className="backBtn"
              onClick={() => history.goBack()}
            />
          </div>

          <div className="coinPageHeader">
            <img
              src={coinInfo.image.small}
              alt="Coin Logo"
              className="coinLogo"
            />
            <div className="headerText">
              <h1 className="coinName">{coinInfo.name}</h1>
              <h3 className="coinPrice">
                USD {coinInfo.market_data.current_price.usd}
              </h3>
            </div>
          </div>

          <div className="marketDataSection">
            <h2 className="subtitle">Market Data</h2>
            {priceHistory.length > 1 && <Line data={data} options={options} />}
            <div className="graphPeriod">
              <button
                className="changePeriodBtn"
                onClick={() => fetchMarketData(1)}
              >
                24h
              </button>
              <button
                className="changePeriodBtn"
                onClick={() => fetchMarketData(7)}
              >
                7d
              </button>
              <button
                className="changePeriodBtn"
                onClick={() => fetchMarketData(15)}
              >
                15d
              </button>
              <button
                className="changePeriodBtn"
                onClick={() => fetchMarketData(30)}
              >
                30d
              </button>
            </div>
          </div>

          <div className="tweetsSection">
            <h2 className="subtitle">Latest Tweets</h2>
            {tweets.map((tweet) => {
              return (
                <div className="tweetCard">
                  <img
                    className="tweetAvatar"
                    src={tweet.user.profile_image_url_https}
                    alt="Avatar"
                  />
                  <div className="tweetText">
                    <h4 className="tweetName">{tweet.user.screen_name}</h4>
                    <p className="tweetContent">{tweet.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <img
          src={require("../../assets/logo.png")}
          alt="Loader"
          className="loader"
        />
      )}
    </>
  );
}

export default Coinpage;
