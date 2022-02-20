import React from "react";
import Modal from "react-modal";
import { dataFormatter } from "../../utils/dataFormatter";
import { Properties } from "./properties";

import closeIcon from "../../assets/close.png";
import styles from "./styles.module.css";

Modal.setAppElement("#root");

function ModalBase({
  name,
  icon,
  price,
  variation,
  lowestPrice,
  highestPrice,
  marketData,
  stars,
  forks,
  prMerged,
  contributors,
  issues,
  isOpen,
  closeModal,
  rankPosition,
}) {
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
        <div className={styles.rankPosition}>#{rankPosition}</div>
        <div className={styles.modalHeader}>
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
