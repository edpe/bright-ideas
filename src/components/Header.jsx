import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

import Separator from "./Separator";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerContents}>
      <Link href="/" passHref>
        <h1 className={styles.heading}>
          Bright <br />
          Ideas.
        </h1>
      </Link>

      <nav>
        <div className={styles.navWrapper}>
          <Link href="/" passHref>
            <p className={styles.navLink}>home</p>
          </Link>
          <Link href="/about" passHref>
            <p className={styles.navLink}>about</p>
          </Link>
        </div>
      </nav>
    </div>
    <Separator />
  </header>
);

export default Header;
