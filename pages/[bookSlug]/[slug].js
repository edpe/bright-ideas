import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Poem = ({ poem }) => {
  return (
    <>
      <div className="paper">
        <div className="layout">
          <div className="poem">
            <h1 className="poemTitle">{poem.title}</h1>
            <p className="poemText">{poem.text}</p>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .paper {
            min-height: 100vh;
          }

          .layout {
            max-width: 500px;
            z-index: 1;
          }

          .poem {
            padding: 3rem 1rem;
            background-color: transparent;
          }

          .poemText {
            white-space: pre-line;
            color: #474645;
            font-weight: 300;
            font-size: 1rem;
            font-family: "Ubuntu", sans-serif;
            line-height: 2;
            background-color: transparent;
          }
          .poemTitle {
            color: #474645;
            font-family: "Ubuntu", sans-serif;
            font-weight: 400;
            font-size: 1rem;
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
