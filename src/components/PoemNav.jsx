import React from "react";
import Link from "next/link";
import styles from "./PoemNav.module.scss";

const ContentsLink = ({ link }) => {
  return (
    <div>
      <Link href={link} passHref>
        <p className={styles.contentsLink}>Back to contents</p>
      </Link>
    </div>
  );
};

const PoemNav = ({ bookSlug, nextPoem, previousPoem, pageType }) => {
  return (
    <div className={styles.poemNav} role="navigation">
      {pageType === "poem" && (
        <div className={styles.poemNav}>
          {previousPoem ? (
            <div className={styles.previous}>
              <p>Previous</p>
              <Link href={`/${bookSlug}/${previousPoem.slug}`}>
                {previousPoem.title}
              </Link>
            </div>
          ) : (
            <ContentsLink link={`/${bookSlug}`} />
          )}
          {nextPoem ? (
            <div className={styles.next}>
              <p>Next</p>
              <Link href={`/${bookSlug}/${nextPoem.slug}`}>
                {nextPoem.title}
              </Link>
            </div>
          ) : (
            <ContentsLink link={`/${bookSlug}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default PoemNav;
