import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const ContentsLink = ({ link }) => {
  return (
    <div>
      <Link href={link} passHref>
        <p className={styles.contentsLink}>Back to contents</p>
      </Link>
    </div>
  );
};

const Footer = ({ bookSlug, nextPoem, previousPoem }) => {
  return (
    <div className={styles.footer} role="navigation">
      {previousPoem ? (
        <div className={styles.previous}>
          <p>Previous</p>
          <Link href={`/${bookSlug}/${previousPoem.slug}`}>
            {previousPoem.title}
          </Link>
        </div>
      ) : (
        <ContentsLink link={bookSlug} />
      )}
      {nextPoem ? (
        <div className={styles.next}>
          <p>Next</p>
          <Link href={`/${bookSlug}/${nextPoem.slug}`}>{nextPoem.title}</Link>
        </div>
      ) : (
        <ContentsLink link={bookSlug} />
      )}
    </div>
  );
};

export default Footer;
