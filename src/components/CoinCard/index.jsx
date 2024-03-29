import React from "react";
import AnimatedOnView from "../AnimatedOnView";
import { dataFormatter } from "../../utils/dataFormatter";
import styles from "./styles.module.css";

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 75 },
};

function CoinCard({
  icon = "",
  name = "",
  price = 0,
  variation = 0,
  coinId = "",
  lowestPrice = "",
  highestPrice = "",
  openCoinCard,
  position = null,
}) {
  return (
    <AnimatedOnView
      variants={variants}
      renderProps={() => (
        <div className={styles.container} onClick={() => openCoinCard(coinId)}>
          <span
            className={variation > 0 ? styles.increase : styles.decrease}
          ></span>
          <span className={styles.position}>#{position ? position : "-"}</span>
          <div>
            <img className={styles.logo} src={icon} alt="Coin logo" />
            <h1 className={styles.name}>{name}</h1>
            <h2 className={styles.price}>{dataFormatter(price, "currency")}</h2>
            <h2 className={styles.variation}>
              {variation ? variation?.toFixed(2) : 0}%
            </h2>
          </div>
          <div className={styles.prevPricesContainer}>
            <div className={styles.variationDiv}>
              <h4 className={styles.label}>24h low</h4>
              <h3 className={styles.data}>
                {dataFormatter(lowestPrice, "currency")}
              </h3>
            </div>
            <div className={styles.variationDivRight}>
              <h4 className={styles.label}>24h high</h4>
              <h3 className={styles.data}>
                {dataFormatter(highestPrice, "currency")}
              </h3>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default CoinCard;
