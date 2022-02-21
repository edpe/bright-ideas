import React from "react";
import styles from "./TitleCard.module.scss";

const TitleCard = ({ bgColor, textColor, children }) => {
  return (
    <div className={styles.TitleCard} style={{ backgroundColor: bgColor }}>
      <p className={styles.poemTitle} style={{ color: textColor }}>
        {children}
      </p>
    </div>
  );
};

export default TitleCard;
