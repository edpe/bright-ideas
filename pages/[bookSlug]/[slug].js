import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Poem = ({ poem }) => {
  return (
    <>
      <div className="paper">
        <div className="layout">
          <h1 className="poemTitle">{poem.title}</h1>
          <p className="poemText">{poem.text}</p>
        </div>
      </div>

      <style jsx>
        {`
          .paper {
            background-color: #f7efe6;
            min-height: 100vh;
          }

          .layout {
            max-width: 500px;
          }

          .poemText {
            white-space: pre-line;
            color: #474645;
            font-family: "Josefin Sans", sans-serif;
            font-weight: 400;
            font-size: 1.25rem;
          }
          .poemTitle {
            color: #474645;
            font-family: "Josefin Sans", sans-serif;
            font-weight: 700;
            font-size: 2rem;
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
