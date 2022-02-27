import React from "react";
import Link from "next/link";
import styles from "./PoemNav.module.scss";

const ContentsLink = ({ link }) => {
  return (
      <Link href={link} passHref>
        <a className={styles.contentsLink}>Back to contents</a>
      </Link>
  );
};

const PoemNav = ({ bookSlug, nextPoem, previousPoem, pageType }) => {
  return (
    <div className={styles.poemNav} role="navigation">
      {pageType === "poem" && (
        <div className={styles.poemNav}>
          {previousPoem ? (
            <Link href={`/${bookSlug}/${previousPoem.slug}`} >
              <a className={styles.previous}>{previousPoem.title}</a> 
              </Link>
          ) : (
            <ContentsLink link={`/${bookSlug}`} />
          )}
          {nextPoem ? (
              <Link href={`/${bookSlug}/${nextPoem.slug}`}>
                <a className={styles.next}>{nextPoem.title}</a>
              </Link>
          ) : (
            <ContentsLink link={`/${bookSlug}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default PoemNav;
