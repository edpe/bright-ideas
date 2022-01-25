import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

const Book = ({ book }) => {
  const currentPage = book.slug;
  return (
    <>
      <div className="paper">
        <div className="layout">
          <h1 className="title">{book.title}</h1>
          {book.poems.map((poem) => (
            <Link href={`/${currentPage}/${poem.slug}`} passHref key={poem.id}>
              <p className="contents">{poem.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>
        {`
          .paper {
            background-color: #f7efe6;
            height: 100vh;
          }

          .layout {
            max-width: 500px;
            padding: 2em;
            line-height: 2;
            align-items: center;
          }
          .contents {
            white-space: pre-line;
            color: #474645;
            font-family: "Josefin Sans", sans-serif;
            font-weight: 400;
            font-size: 1.25rem;
            text-align: center;
            cursor: pointer;
          }
          .title {
            color: #474645;
            font-family: "Josefin Sans", sans-serif;
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
