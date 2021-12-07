import React from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";

function ModalBase({
  name,
  icon,
  price,
  variation,
  lowestPrice,
  highestPrice,
  marketData,
  isOpen,
}) {
  const [modalIsOpen, setIsOpen] = React.useState(isOpen);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.modalBg}
    >
      <div className={styles.modalContent}>
        <div>
          <img className={styles.logo} src={icon} alt="Coin logo" />
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.price}>$ {price}</h2>
          <h2 className={styles.variation}>{variation?.toFixed(2)}%</h2>
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
    </Modal>
  );
}

export default ModalBase;
