import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Poem = ({ poem }) => {
  return (
    <>
      <div className="layout">
        <h1>{poem.title}</h1>
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
        poems {
          slug
        }
      }
    `,
  });

  const paths = data.poems.map((poem) => ({
    params: { slug: poem.slug },
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
