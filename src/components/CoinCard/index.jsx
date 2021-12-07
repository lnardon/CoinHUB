import React from "react";
import AnimatedOnView from "../AnimatedOnView";
import styles from "./styles.module.css";

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 75 },
};

function CoinCard({
  icon = "",
  name = "",
  price = 0,
  variation,
  coinId = "",
  lowestPrice = "",
  highestPrice = "",
}) {
  return (
    <AnimatedOnView
      variants={variants}
      renderProps={() => (
        <div
          className={styles.container}
          onClick={() => (window.location.href = `/coin/${coinId}`)}
        >
          <span
            className={variation > 0 ? styles.increase : styles.decrease}
          ></span>
          <div>
            <img className={styles.logo} src={icon} alt="Coin logo" />
            <h1 className={styles.name}>{name}</h1>
            <h2 className={styles.price}>$ {price}</h2>
            <h2 className={styles.variation}>{variation.toFixed(2)}%</h2>
          </div>
          <div className={styles.prevPricesContainer}>
            <div className={styles.variationDiv}>
              <h4 className={styles.label}>24h low</h4>
              <h3 className={styles.data}>{lowestPrice}</h3>
            </div>
            <div className={styles.variationDivRight}>
              <h4 className={styles.label}>24h high</h4>
              <h3 className={styles.data}>{highestPrice}</h3>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default CoinCard;
