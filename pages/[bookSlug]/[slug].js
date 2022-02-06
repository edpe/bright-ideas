import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import theme from "../../theme";

const Poem = ({ poem, book }) => {
  const router = useRouter();

  const currentPoem = book.poems.find(
    (poem) => poem.slug === router.query.slug
  );

  const nextPoem = book.poems.find(
    (poem) => parseInt(poem.poemId) === parseInt(currentPoem?.poemId) + 1
  );

  const previousPoem = book.poems.find(
    (poem) => parseInt(poem?.poemId) === parseInt(currentPoem?.poemId) - 1
  );

  return (
    <>
      <div className="paper">
        <div className="layout">
          <nav className="navbar">
            <h3>about</h3>
            <Link href="/" passHref>
              <h3>home</h3>
            </Link>
          </nav>
          <main>
            <div className="poem">
              <h1 className="poemTitle">{poem.title}</h1>
              <p className="poemText">{poem.text}</p>
              <div className="poemNav" role="navigation">
                {previousPoem && (
                  <div>
                    <p>Previous</p>
                    <Link
                      href={`${router.query.bookSlug}/${previousPoem.slug}`}
                    >
                      {previousPoem.title}
                    </Link>
                  </div>
                )}
                {nextPoem && (
                  <div>
                    <p>Next</p>
                    <Link href={`/${router.query.bookSlug}/${nextPoem.slug}`}>
                      {nextPoem.title}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </main>
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
            font-weight: 400;
            font-size: 1rem;
            font-family: "Ubuntu", sans-serif;
            line-height: 2;
            background-color: transparent;
          }
          .poemTitle {
            color: #474645;
            font-family: "Ubuntu", sans-serif;
            font-weight: 500;
            font-size: 1rem;
          }

          .poemNav {
            font-family: "Ubuntu", sans-serif;
            display: flex;
            justify-content: space-between;
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

          @media (min-width: 800px) {
            .navbar h3 {
              font-size: 1.5rem;
            }

            .navbar {
              padding: 2rem 3rem;
            }
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
      query getPoemAndBook($slug: String!, $bookSlug: String!) {
        poems(where: { slug: $slug }) {
          id
          title
          text
          author
          slug
        }
        books(where: { slug: $bookSlug }) {
          poems {
            poemId
            slug
            title
          }
        }
      }
    `,
    variables: { slug: params.slug, bookSlug: params.bookSlug },
  });

  return {
    props: {
      poem: data.poems[0],
      book: data.books[0],
    },
  };
}

export default Poem;
