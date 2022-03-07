import React, { useRef } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import PoemLayout from "../../src/components/PoemLayout";
import Header from "../../src/components/Header";
import Content from "../../src/components/Content";
import Footer from "../../src/components/Footer";
import Layout from "../../src/components/Layout";
import PoemNav from "../../src/components/PoemNav";
import BookTitle from "../../src/components/BookTitle";

import { Poem, Book } from "../../src/types";

interface PoemPageProps {
  poem: Poem;
  book: Book;
}

interface PageSlugs {
  bookSlug: string;
  slug: string;
}

interface StaticProps {
  params: PageSlugs;
}

const PoemPage = (props: PoemPageProps) => {
  const router = useRouter();
  const topOfPoemRef = useRef<HTMLDivElement>(null);

  const currentPoem: Poem = props.book.poems.find(
    (poem) => poem.slug === router.query.slug
  );

  const nextPoem = props.book.poems.find(
    (poem) => parseInt(poem.poemId) === parseInt(currentPoem?.poemId) + 1
  );

  const previousPoem = props.book.poems.find(
    (poem) => parseInt(poem.poemId) === parseInt(currentPoem?.poemId) - 1
  );

  const bookPage = router.query.bookSlug;

  const executeScroll = () => topOfPoemRef?.current?.scrollIntoView();

  return (
    <>
      <Layout>
        <Header />

        <div ref={topOfPoemRef}>
          <Content>
            <title>{props.poem.title}</title>
            <BookTitle linkDestination={bookPage}>{props.book.title}</BookTitle>
            <PoemLayout title={props.poem.title} body={props.poem.text} />
          </Content>
        </div>

        <Footer>
          <PoemNav
            onClick={executeScroll}
            bookSlug={bookPage}
            nextPoem={nextPoem}
            previousPoem={previousPoem}
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
    .map((book: Book) =>
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

export async function getStaticProps(props: StaticProps) {
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
    variables: { slug: props.params.slug, bookSlug: props.params.bookSlug },
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
