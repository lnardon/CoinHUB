import React, { useState, useEffect, useCallback } from "react";
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
        }/market_chart?vs_currency=usd&days=1&interval=hourly/`
      );
      parsedResponse = await response.json();
      setPriceHistory(parsedResponse.prices.map((data) => data[1]));
    })();
  }, []);

  const data = {
    labels: priceHistory.slice(0, 23).map((e) => msToDate(e)),
    datasets: [
      {
        data: priceHistory.slice(0, 23),
        fill: true,
        backgroundColor:
          coinInfo?.market_data.price_change_percentage_24h > 0
            ? "rgb(23, 255, 100)"
            : "rgb(255, 23, 100)",
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
