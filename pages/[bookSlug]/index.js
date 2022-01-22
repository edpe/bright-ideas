import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

const Book = ({ book }) => {
  const currentPage = book.slug;
  return (
    <>
      <div className="layout">
        <h1>{book.title}</h1>
        {book.poems.map((poem) => (
          <div key={poem.id}>
            <Link href={`/${currentPage}/${poem.slug}`} passHref>
              <p>{poem.title}</p>
            </Link>
          </div>
        ))}
      </div>
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
