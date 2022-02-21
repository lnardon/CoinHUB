import React, { useEffect } from "react";
import Modal from "react-modal";
import { dataFormatter } from "../../utils/dataFormatter";
import { Properties } from "./properties";

import closeIcon from "../../assets/close.png";
import styles from "./styles.module.css";

Modal.setAppElement("#root");

function ModalBase({
  name = "",
  icon = "",
  price = 0,
  variation = 0,
  lowestPrice = 0,
  highestPrice = 0,
  rankPosition = 0,
  marketData = {
    ath: {
      usd: 0,
    },
    ath_change_percentage: {
      usd: 0,
    },
    atl: {
      usd: 0,
    },
    atl_change_percentage: {
      usd: 0,
    },
    market_cap: {
      usd: 0,
    },
    total_volume: {
      usd: 0,
    },
    price_change_percentage_24h: 0,
    price_change_percentage_7d: 0,
    price_change_percentage_30d: 0,
    price_change_percentage_200d: 0,
    price_change_percentage_1y: 0,
    total_supply: 0,
  },
  stars = 0,
  forks = 0,
  prMerged = 0,
  contributors = 0,
  issues = 0,
  isOpen,
  closeModal,
}) {
  // Fix bug with react-modal package
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modalBg}
      shouldCloseOnOverlayClick={true}
    >
      <div className={styles.modalContent}>
        <img
          className={styles.closeBtn}
          src={closeIcon}
          alt="Close"
          onClick={closeModal}
        />
        <div
          className={
            styles.rankPosition +
            " " +
            (variation < 0 ? styles.down : styles.up)
          }
        >
          #{rankPosition}
        </div>
        <div
          className={
            styles.modalHeader + " " + (variation < 0 ? styles.down : styles.up)
          }
        >
          <img className={styles.logo} src={icon} alt="Coin logo" />
          <div className={styles.headerInfo}>
            <h1 className={styles.name}>{name}</h1>
            <h2 className={styles.price}>{dataFormatter(price, "currency")}</h2>
          </div>
          <h2
            className={
              styles.variation +
              " " +
              (variation > 0 ? styles.variationUp : styles.variationDown)
            }
          >
            {dataFormatter(variation, "percentage")}
          </h2>
        </div>

        {/* Market data */}
        <h2 className={styles.sectionTitle}>Market Data</h2>
        <div className={styles.prevPricesContainer}>
          <div className={styles.variationDiv}>
            <h4 className={styles.label}>24h high</h4>
            <h3 className={styles.data}>
              {dataFormatter(highestPrice, "currency")}
            </h3>
          </div>
          <div className={styles.variationDiv}>
            <h4 className={styles.label}>24h low</h4>
            <h3 className={styles.data}>
              {dataFormatter(lowestPrice, "currency")}
            </h3>
          </div>
          {Properties.map((p) => {
            return (
              <div className={styles.variationDiv} key={p.label}>
                <h4 className={styles.label}>{p.label}</h4>
                <h3 className={styles.data}>
                  {dataFormatter(marketData[p?.data], p.type)}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Developer data */}
        <h2 className={styles.sectionTitle}>Developer Data</h2>
        <div className={styles.developerData}>
          <div className={styles.variationDiv} key="stars">
            <h4 className={styles.label}>Stars</h4>
            <h3 className={styles.data}>{stars}</h3>
          </div>
          <div className={styles.variationDiv} key="forks">
            <h4 className={styles.label}>Forks</h4>
            <h3 className={styles.data}>{forks}</h3>
          </div>
          <div className={styles.variationDiv} key="pr_merged">
            <h4 className={styles.label}>PR Merged</h4>
            <h3 className={styles.data}>{prMerged}</h3>
          </div>
          <div className={styles.variationDiv} key="contributors">
            <h4 className={styles.label}>PR Contributors</h4>
            <h3 className={styles.data}>{contributors}</h3>
          </div>
          <div className={styles.variationDiv} key="issues">
            <h4 className={styles.label}>Total Issues</h4>
            <h3 className={styles.data}>{issues}</h3>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalBase;
