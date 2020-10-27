import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Coinpage(props) {
  const history = useHistory();
  const [coinInfo, setCoinInfo] = useState(undefined);
  const [tweets, setTweets] = useState(undefined);

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
    <>
      {coinInfo ? (
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
          </div>

          <div className="tweetsSection">
            <h2 className="subtitle">Latest Tweets</h2>
            {/* {tweets.map((tweet) => {
              return (
                <div className="tweetCard">
                  <img src="" alt="Avatar" />
                  <h4 className="tweetName"></h4>
                  <p className="tweetContent"></p>
                </div>
              );
            })} */}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Coinpage;
