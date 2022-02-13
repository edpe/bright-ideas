import React from "react";
import Link from "next/link";
import styles from "./Bookshelf.module.scss";

export const Book = ({ link, book }) => {
  return (
    <Link href={link} as={book.slug} passHref>
      <div className={styles.book}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
      </div>
    </Link>
  );
};

const Bookshelf = ({ books, link }) => {
  return (
    <div className={styles.bookShelf}>
      {books.map((book) => (
        <Book key={book.id} book={book} link={link} />
      ))}
    </div>
  );
};
export default Bookshelf;
