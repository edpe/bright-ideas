import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

import useMediaQuery from "../../src/hooks/useMediaQuery";

import Header from "../../src/components/Header";
import Layout from "../../src/components/Layout";
import Content from "../../src/components/Content";
import Footer from "../../src/components/Footer";
import TitleCard from "../../src/components/TitleCard";

const Book = ({ book }) => {
  const isMobile = useMediaQuery(768);

  let orderedPoems = [...book.poems].sort((a, b) =>
    parseInt(a.poemId) > parseInt(b.poemId) ? 1 : -1
  );

  const currentPage = book.slug;
  return (
    <>
      <Layout>
        <Header />
        <Content>
          <ul
            className="poemList"
            style={{ listStyle: "none", paddingLeft: 0 }}
          >
            {orderedPoems.map((poem) => (
              <li key={poem.poemId}>
                <Link href={`/${currentPage}/${poem.slug}`} passHref>
                  <TitleCard>{poem.title}</TitleCard>
                </Link>
              </li>
            ))}
          </ul>
        </Content>
        <Footer />
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
            poemId
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
