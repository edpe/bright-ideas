import React, { useEffect, useRef } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Poem from "../../src/components/Poem";
import Header from "../../src/components/Header";
import Content from "../../src/components/Content";
import Footer from "../../src/components/Footer";
import Layout from "../../src/components/Layout";
import PoemNav from "../../src/components/PoemNav";
import BookTitle from "../../src/components/BookTitle";

const PoemPage = ({ poem, book }) => {
  const router = useRouter();
  const topOfPoemRef = useRef(null);

  const currentPoem = book.poems.find(
    (poem) => poem.slug === router.query.slug
  );

  const nextPoem = book.poems.find(
    (poem) => parseInt(poem.poemId) === parseInt(currentPoem?.poemId) + 1
  );

  const previousPoem = book.poems.find(
    (poem) => parseInt(poem.poemId) === parseInt(currentPoem?.poemId) - 1
  );

  const bookPage = router.query.bookSlug;

  const executeScroll = () => topOfPoemRef.current.scrollIntoView();

  return (
    <>
      <Layout>
        <Header />

        <span ref={topOfPoemRef} />
        <Content>
          <BookTitle linkDestination={bookPage}>{book.title}</BookTitle>
          <Poem title={poem.title} body={poem.text} />
        </Content>

        <Footer>
          <PoemNav
            onClick={executeScroll}
            bookSlug={bookPage}
            nextPoem={nextPoem}
            previousPoem={previousPoem}
            pageType={"poem"}
          />
        </Footer>
      </Layout>
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
          title
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
    revalidate: 3600,
  };
}

export default PoemPage;
