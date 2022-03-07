import React from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => (
  <div className={styles.layout}>{props.children}</div>
);

export default Layout;
