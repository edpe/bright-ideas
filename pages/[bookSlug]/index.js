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
        </nav>
        <div className="overlay"></div>

        <main className="layout">
          <h1 className="title">{book.title}</h1>
          {book.poems.map((poem) => (
            <Link href={`/${currentPage}/${poem.slug}`} passHref key={poem.id}>
              <p className="contents">{poem.title}</p>
            </Link>
          ))}
        </main>
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
            height: 100%
            width: 100%;
            background-color: ${theme.colors.copperCrayola};
            opacity: 0.8;
            top: 0;
            right: 0;
          }

          .layout {
            display: flex;
            flex-direction: column;
            background-color: ${theme.colors.copperCrayola};
            height: 100vh;
            background-image: url("/images/dried_flowers.jpeg");
            background-size: cover;
          }

          .lavendar {
            max-width: 100%;
          }

          .navbar {
            padding: 1rem 2.5rem;
            background-color: ${theme.colors.white};
            font-family: "Merriweather", serif;
            border-bottom: 1px solid ${theme.colors.tumbleweed};
          }

          .navbar h3 {
            color: ${theme.colors.blackLighter};
            margin: 0;
            font-weight: 300;
            text-align: right;
            font-size: 1rem;
          }

          .contents {
            z-index: 1;

            white-space: pre-line;
            color: ${theme.colors.actualBlack};

            font-family: "Merriweather", serif;

            font-weight: 400;
            font-size: 1.25rem;
            text-align: center;
            cursor: pointer;
          }
          .title {
            z-index: 1;
            color: ${theme.colors.actualBlack};

            font-family: "Merriweather", serif;

            font-weight: 700;
            font-size: 2rem;
            text-align: center;
          }
        `}
      </style>
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
