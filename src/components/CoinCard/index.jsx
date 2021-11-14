import React from "react";
import styles from "./styles.module.css";

function CoinCard({
  icon,
  name,
  price,
  variation,
  coinId,
  lowestPrice,
  highestPrice,
}) {
  return (
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
        <h2 className={styles.price}>{price}</h2>
        <h2 className={styles.variation}>{variation.toFixed(2)}%</h2>
      </div>
      <div className={styles.prevPricesContainer}>
        <div>
          <h4>24h low</h4>
          <h3>{lowestPrice}</h3>
        </div>
        <div>
          <h4>24h high</h4>
          <h3>{highestPrice}</h3>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;
