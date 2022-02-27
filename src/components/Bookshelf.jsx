import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Bookshelf.module.scss";

export const Book = ({ link, book, imageIndex }) => {
  return (
    <Link href={link} as={`/${book.slug}`} passHref>
      <li className={styles.book}>
        <div className={styles.bookImage}>
          <Image
            src={`/images/scaledBookImage${imageIndex + 1}.jpeg`}
            layout="fill"
            alt="book image"
          />
        </div>
        <h2 className={styles.bookTitle}>{book.title}</h2>
      </li>
    </Link>
  );
};

const Bookshelf = ({ books, link }) => {
  return (
    <ul className={styles.bookShelf}>
      {books.map((book, index) => (
        <Book
          key={book.id}
          book={book}
          link={link}
          imageIndex={index}
          tabIndex={index}
        />
      ))}
    </ul>
  );
};
export default Bookshelf;
