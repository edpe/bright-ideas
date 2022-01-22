import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Poem = ({ poem }) => {
  return (
    <>
      <div className="layout">
        <h1 className="poemTitle">{poem.title}</h1>
        <p className="poemText">{poem.text}</p>
      </div>
      <style jsx>
        {`
          .poemText {
            white-space: pre-line;
          }
          .layout {
            max-width: 500px;
            margin: 0 auto;
            padding: 2em;
            line-height: 2;
          }
          .poemTitle {
            font-family: Futura, Trebuchet MS, Arial, sans-serif;
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
      query getPoemSlugs {
        books {
          slug
          poems {
            slug
          }
        }
      }
    `,
  });

  const paths = data.books
    .map((book) =>
      book.poems.map((poem) => ({
        params: {
          bookSlug: book.slug,
          slug: poem.slug,
        },
      }))
    )
    .flat();

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://larkin-cms.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getPoem($slug: String!) {
        poems(where: { slug: $slug }) {
          id
          title
          text
          author
          slug
        }
      }
    `,
    variables: { slug: params.slug },
  });

  return {
    props: {
      poem: data.poems[0],
    },
  };
}

export default Poem;
