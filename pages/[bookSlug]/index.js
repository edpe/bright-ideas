import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import theme from "../../theme";

const Book = ({ book }) => {
  const currentPage = book.slug;
  return (
    <>
      <div className="page">
        <nav className="navbar">
          <h3>about</h3>
          <Link href="/" passHref>
            <h3>home</h3>
          </Link>
        </nav>

        <main className="layout">
          <div className="leftColumn" />
          <div className="centreColumn">
            <h1 className="title">{book.title}</h1>
            <ul className="contents">
              {book.poems.map((poem) => (
                <li key={poem.id}>
                  <Link href={`/${currentPage}/${poem.slug}`} passHref>
                    <p className="poemTitle">{poem.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rightColumn" />
        </main>
        {/* <div className="overlay"></div> */}
      </div>

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

            background-color: ${theme.colors.brownSugar};
            opacity: 0.5;
            top: 0;
            right: 0;
          }

          .layout {
            display: flex;
            flex-direction: row;
          }

          .leftColumn {
            flex: 0;
          }

          .centreColumn {
            flex: 1;
            background-color: ${theme.colors.white};
            opacity: 0.8;
            padding: 2rem 2rem;
          }

          .rightColumn {
            flex: 0;
          }

          @media (min-width: 800px) {
            .leftColumn {
              flex: 1;
            }

            .centreColumn {
              flex: 1;
              background-color: ${theme.colors.white};
              opacity: 0.8;
            }

            .rightColumn {
              flex: 1;
            }

            .navbar h3 {
              font-size: 1.5rem;
            }

            .navbar {
              padding: 2rem 3rem;
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

          .contents {
            z-index: 1;
            padding: 1rem 2rem;
            list-style: none;
          }

          .poemTitle {
            font-family: "Ubuntu", sans-serif;
            cursor: pointer;
            display: flex;
            justify-content: center;
            transition: all 0.5s ease-in-out;
            background-color: ${theme.colors.white};
            padding: 1rem;
            margin: 0.1rem;
            color: ${theme.colors.blackLighter};
            text-align: center;
            line-height: 1.5;
          }

          .poemTitle:hover {
            background-color: ${theme.colors.tumbleweed};
            transform: scale(1.1);
          }

          .title {
            z-index: 1;
            color: ${theme.colors.actualBlack};
            font-family: "Ubuntu", sans-serif;
            font-weight: 700;
            font-size: 2rem;
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
            id
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
