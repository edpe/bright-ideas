import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Bookshelf.module.scss";

export const Book = ({ link, book, imageIndex }) => {
  return (
    <Link href={link} as={`/${book.slug}`} passHref>
      <div className={styles.book}>
        <div className={styles.bookImage}>
          <Image
            src={`/images/bookImage${imageIndex + 1}.jpeg`}
            layout="fill"
            alt="book image"
          />
        </div>
        <h3 className={styles.bookTitle}>{book.title}</h3>
      </div>
    </Link>
  );
};

const Bookshelf = ({ books, link }) => {
  return (
    <div className={styles.bookShelf}>
      {books.map((book, index) => (
        <Book key={book.id} book={book} link={link} imageIndex={index} />
      ))}
    </div>
  );
};
export default Bookshelf;
