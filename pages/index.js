import Head from "next/head";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Layout from "../src/components/Layout";
import Content from "../src/components/Content";
import Bookshelf from "../src/components/Bookshelf";
import Hero from "../src/components/Hero";
import Quotation from "../src/components/Quotation";
import Separator from "../src/components/Separator";

import useMediaQuery from "../src/hooks/useMediaQuery";

const metaData = {
  name: "Bright Ideas",
  description: "Little books of inspirational verse and prose by P J Perkins",
  image: "https://bright-ideas.vercel.app/meta-image.png",
  url: "https://bright-ideas.vercel.app/",
};

export default function Home({ books }) {
  const isMobile = useMediaQuery(768);

  let orderedBooks = [...books].sort((a, b) =>
    parseInt(a.bookId) > parseInt(b.bookId) ? 1 : -1
  );

  return (
    <>
      <Head>
        <title>Bright Ideas</title>

        <meta name="description" content={metaData.description} />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={metaData.name}></meta>
        <meta itemProp="description" content={metaData.description} />
        <meta itemProp="image" content={metaData.image} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={metaData.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaData.name} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.name} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.image}></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header />
        <Content>
          {isMobile ? (
            <Hero
              image={`/images/heroImageWithText.png`}
              width={1024}
              height={500}
            />
          ) : (
            <Hero
              image={`/images/hero_image_only.png`}
              width={1024}
              height={500}
            />
          )}
          {/* TODO: replace div with vertical spacing component */}

          <Bookshelf books={orderedBooks} link="[slug]" />
          <div style={{ margin: "2rem 0" }}>
            <Separator />
            <Quotation
              cite="/bright-ideas-in-action/the-value-of-a-moment"
              source="The Value of a Moment"
              author="P J Perkins"
            >
              <p>
                Sharing an idea that helps another,
                {isMobile && <br />} Is the best moment <br />
                You can ever have - It is a moment of love.
              </p>
            </Quotation>
            <Separator />
          </div>
        </Content>
        <Footer />
      </Layout>
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
          bookId
          title
          created
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
    revalidate: 3600,
  };
}
