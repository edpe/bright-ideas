import React from "react";
import Link from "next/link";
import styles from "./PoemNav.module.scss";

import { Poem } from "../types";

interface ContentsLinkProps {
  link: string;
}

const ContentsLink = (props: ContentsLinkProps) => {
  return (
    <Link href={props.link} passHref>
      <a className={styles.contentsLink}>Contents</a>
    </Link>
  );
};

interface PoemNavProps {
  bookSlug: string;
  nextPoem: Poem;
  previousPoem: Poem;
  onClick: () => void;
}

const PoemNav = (props: PoemNavProps) => {
  return (
    <div className={styles.poemNav} role="navigation">
      <div className={styles.poemNav}>
        {props.previousPoem ? (
          <Link href={`/${props.bookSlug}/${props.previousPoem.slug}`}>
            <a className={styles.previous} onClick={props.onClick}>
              Back
            </a>
          </Link>
        ) : (
          <ContentsLink link={`/${props.bookSlug}`} />
        )}
        {props.nextPoem ? (
          <Link href={`/${props.bookSlug}/${props.nextPoem.slug}`}>
            <a className={styles.next} onClick={props.onClick}>
              Next
            </a>
          </Link>
        ) : (
          <ContentsLink link={`/${props.bookSlug}`} />
        )}
      </div>
    </div>
  );
};

export default PoemNav;
