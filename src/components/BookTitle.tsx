import React from "react";
import styles from "./BookTitle.module.scss";
import Link from "next/link";

interface BookTitleProps {
  children: React.ReactNode;
  linkDestination: string;
}

const Booktitle = (props: BookTitleProps) => {
  return (
    <div className={styles.bookTitle}>
      {props.linkDestination ? (
        <Link href={`/${props.linkDestination}`} passHref>
          <a>{props.children}</a>
        </Link>
      ) : (
        <span>{props.children}</span>
      )}
    </div>
  );
};

export default Booktitle;
