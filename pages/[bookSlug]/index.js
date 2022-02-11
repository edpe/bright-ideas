import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import theme from "../../theme";
import Image from "next/image";

import useMediaQuery from "../../src/hooks/useMediaQuery";

import Header from "../../src/components/Header";
import Layout from "../../src/components/Layout";

const Book = ({ book }) => {
  const isMobile = useMediaQuery(768);

  let orderedPoems = [...book.poems].sort((a, b) =>
    parseInt(a.poemId) > parseInt(b.poemId) ? 1 : -1
  );

  const currentPage = book.slug;
  return (
    <>
      <Layout>
        <Header />

        <main className="layout">
          <div className="leftImage">
            <Image
              src="/images/cornflower.png"
              alt="cornflower"
              layout="fixed"
              width={881 * (isMobile ? 0.1 : 0.25)}
              height={3306 * (isMobile ? 0.1 : 0.25)}
            />
          </div>
          <div className="contents">
            <h1 className="title">{book.title}</h1>
            <h2 className="listTitle">Contents:</h2>
            <ul className="poemList">
              {orderedPoems.map((poem) => (
                <li key={poem.poemId}>
                  <Link href={`/${currentPage}/${poem.slug}`} passHref>
                    <p className="poemTitle">{poem.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rightImage">
            <Image
              src="/images/purpleflower.png"
              alt="flower"
              layout="fixed"
              width={800 * (isMobile ? 0.1 : 0.2)}
              height={4100 * (isMobile ? 0.1 : 0.2)}
            />
          </div>
        </main>
      </Layout>
      >
      <style jsx>
        {`
          .page {
            display: flex;
            flex-direction: column;
          }
          .overlay {
            pointer-events: none;
            position: absolute;
            width: 100%;
            height: 170%;

            opacity: 0.5;
            top: 0;
            right: 0;
          }

          .layout {
            display: flex;
            flex-direction: row;
            max-width: 1024px;
            margin: auto;
            justify-content: center;
          }
          .contents {
            position: absolute;
          }

          .leftImage {
            position: relative;
            top: 40px;
            left: -120px; //bright-ideas
          }

          .rightImage {
            position: absolute;
            top: 440px;
            right: -4px; //bright-ideas
          }
          .listTitle {
            text-align: center;
            font-weight: 300;
            font-size: 1rem;
            margin-top: 2rem;
          }
          @media (min-width: 800px) {
            .navbar h3 {
              font-size: 1.5rem;
            }

            .navbar {
              padding: 2rem 3rem;
            }

            .leftImage {
              position: relative;
              top: 71px;
              left: -165px;
            }

            .rightImage {
              position: absolute;
              top: 100px;
              right: 200px;
            }

            .leftImage {
              position: absolute;
              top: 30;
              left: 200px;
            }

            .listTitle {
              font-size: 1.5rem;
            }

            .poemTitle {
              font-size: 1.25rem;
            }

            .title {
              font-size: 2rem;
            }
          }

          .navbar {
            padding: 1rem 1rem;
            background-color: ${theme.colors.white};
            font-family: "Ubuntu", sans-serif;
            border-bottom: 1px solid ${theme.colors.white};
            display: flex;
            justify-content: flex-end;
          }

          .navbar h3 {
            color: ${theme.colors.blackLighter};
            margin: 0 1rem;
            font-weight: 300;
            text-align: right;
            font-size: 1rem;
          }

          .poemList {
            z-index: 1;
            padding: 0 2rem;
            list-style: none;
          }

          .poemTitle {
            font-family: "Ubuntu", sans-serif;
            cursor: pointer;
            display: flex;
            justify-content: center;
            transition: all 0.5s ease-in-out;
            background-color: transparent;
            padding: 1rem;
            margin: 0.1rem;
            color: ${theme.colors.blackLighter};
            text-align: center;
            line-height: 1.5;
          }

          .poemTitle:hover {
            background-color: ${theme.colors.lavenderBlue};
            color: ${theme.colors.actualBlack};
            opacity: 0.5;
            transform: scale(1.1);
            border-radius: 5% / 50%;
          }

          .title {
            z-index: 1;
            color: ${theme.colors.actualBlack};
            font-family: "Ubuntu", sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            text-align: center;
            margin: 0.5rem;
          }
        `}
      </style>
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
};

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://larkin-cms.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getBookSlugs {
        books {
          slug
        }
      }
    `,
  });

  const paths = data.books.map((book) => ({
    params: { bookSlug: book.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://larkin-cms.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getBook($slug: String!) {
        books(where: { slug: $slug }) {
          slug
          title
          poems {
            poemId
            title
            slug
          }
        }
      }
    `,
    variables: { slug: params.bookSlug },
  });
  return {
    props: {
      book: data.books[0],
    },
  };
}

export default Book;
