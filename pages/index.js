import Head from "next/head";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import theme from "../theme.js";

import { useState, useCallback, useEffect } from "react";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};

export default function Home({ books }) {
  return (
    <>
      <Head>
        {/* generate from cms */}

        <title>Bright Ideas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page">
        <nav className="navbar">
          <h3>about</h3>
        </nav>
        <main className="layout">
          <div className="bookShelf">
            <h2>Books in this collection:</h2>
            {books.map((book) => (
              <Link href="[slug]" as={book.slug} passHref key={book.id}>
                <div className="book">
                  <h3>{book.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <div className="imageWrapper">
              <img
                className="lavendar"
                src={
                  useMediaQuery(800)
                    ? "/images/lavendar_invert_cropped_mobile.jpeg"
                    : "/images/lavendar_invert_cropped.jpeg"
                }
                alt="lavendar"
              />
            </div>
          </div>
        </main>

        <div className="overlay"></div>
      </div>

      <style jsx>{`
        .page {
          display: flex;
          max-height: 100vh;
          flex-direction: column;
          overflow: hidden;
        }
        .overlay {
          pointer-events: none;
          position: absolute;
          height: 100vh;
          width: 100%;
          background-color: ${theme.colors.lavenderBlue};
          opacity: 0.5;
          top: 0;
          right: 0;
        }

        .layout {
          display: flex;
          flex-direction: column;
          background-color: ${theme.colors.actualBlack};
          height: 100vh;
        }

        .lavendar {
          max-width: 100%;
        }

        .navbar {
          font-size: 1rem;
          padding: 1rem;
          background-color: ${theme.colors.actualBlack};
          font-family: "Libre Baskerville", serif;
        }

        .navbar:focus {
        }
        .navbar h3 {
          color: ${theme.colors.white};
          margin: 0;
          font-weight: 300;
          text-align: right;
        }

        .flowers {
          align-self: flex-end;
        }

        .bookShelf {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          color: ${theme.colors.blackDarker};

          font-weight: 300;
        }

        .bookShelf h2 {
          color: ${theme.colors.white};
          font-weight: 700;
          margin: 2rem 0;
          font-family: "Libre Baskerville", serif;
          font-size: 1.4rem;
          text-align: center;
          font-style: italic;
        }

        .book {
          cursor: pointer;
          display: flex;
          justify-content: center;
          transition: all 0.3s ease-in-out;
          background-color: ${theme.colors.indigoDye};
          border-radius: 8px;
          padding: 1rem;
          margin: 0.1rem;
          min-width: 220px;
        }

        .book h3 {
          color: ${theme.colors.white};
          font-size: 1.5rem;
          font-weight: 300;
          margin: 0;
          align-self: center;
          font-family: "Libre Baskerville", serif;
          font-weight: 400;
          font-size: 1.4rem;
        }
      `}</style>
      <style jsx global>{`
        html {
          margin: 0;
        }

        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://larkin-cms.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getBooks {
        books {
          id
          title
          slug
          poems {
            id
            title
            slug
          }
        }
      }
    `,
  });

  return {
    props: {
      books: data.books,
    },
  };
}
