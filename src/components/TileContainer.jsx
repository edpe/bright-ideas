import React from "react";
import Styles from "./TileContainer.module.scss";

const TileContainer = ({ children }) => {
  return <ul className={Styles.TileContainer}>{children}</ul>;
};

export default TileContainer;
