import Head from "next/head";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Layout from "../src/components/Layout";
import Content from "../src/components/Content";
import Bookshelf from "../src/components/Bookshelf";
import Hero from "../src/components/Hero";

import useMediaQuery from "../src/hooks/useMediaQuery";

export default function Home({ books }) {
  const isMobile = useMediaQuery(768);
  return (
    <>
      <Head>
        {/* generate from cms */}

        <title>Bright Ideas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header />

        <Content>
          {isMobile ? (
            <Hero image={`/images/heroImage.png`} width={1024} height={600}>
              Bright
              <br />
              Ideas.
            </Hero>
          ) : (
            <Hero
              image={`/images/heroImageCropped.png`}
              width={1024}
              height={400}
            >
              Bright
              <br />
              Ideas.
            </Hero>
          )}
          <div className="bookShelfPosition">
            <Bookshelf books={books} link="[slug]" />
          </div>
        </Content>
        <Footer bookSlug={""} nextPoem={""} previousPoem={""} />
      </Layout>

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
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://larkin-cms.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getBooks {
        books {
          id
          title
          slug
          poems {
            id
            title
            slug
          }
        }
      }
    `,
  });

  return {
    props: {
      books: data.books,
    },
  };
}
