import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Bookshelf.module.scss";
import bookImage1 from "../../public/images/bookImage1.webp";
import bookImage2 from "../../public/images/bookImage2.webp";
import bookImage3 from "../../public/images/bookImage3.webp";

const bookImage = [bookImage1, bookImage2, bookImage3];

export const Book = ({ link, book, imageIndex }) => {
  return (
    <Link href={link} as={`/${book.slug}`} passHref>
      <li className={styles.book}>
        <div className={styles.bookImage}>
          <Image
            src={bookImage[imageIndex]}
            layout="fill"
            alt="book image"
            placeholder="blur"
          />
        </div>
        <h2 className={styles.bookTitle}>{`${book.title} (${book.created.slice(
          0,
          4
        )})`}</h2>
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
