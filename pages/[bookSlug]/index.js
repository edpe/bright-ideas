import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

import useMediaQuery from "../../src/hooks/useMediaQuery";

import Header from "../../src/components/Header";
import Layout from "../../src/components/Layout";
import Content from "../../src/components/Content";
import Footer from "../../src/components/Footer";
import TitleCard from "../../src/components/TitleCard";
import TileContainer from "../../src/components/TileContainer";

const palette1 = ["#2E4660", "#60935D", "#BAB700", "#FF579F", "#8B92E5"];
const palette2 = ["#F5E0B7", "#D6BA73", "#8BBF9F", "#857E7B", "#59344F"];
const palette3 = ["#EEEEFF", "#7F7CAF", "#9FB4C7", "#28587B", "#9FB798"];

const palettes = [palette1, palette2, palette3];

var uniqueRandoms = [];
var numRandoms = 5;

function makeUniqueRandom() {
  if (!uniqueRandoms.length) {
    for (var i = 0; i < numRandoms; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];

  uniqueRandoms.splice(index, 1);

  return val;
}

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#382e31" : "#fff";
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Book = ({ book }) => {
  const isMobile = useMediaQuery(768);

  let orderedPoems = [...book.poems].sort((a, b) =>
    parseInt(a.poemId) > parseInt(b.poemId) ? 1 : -1
  );

  const currentPage = book.slug;

  const randomColorArray = [];

  for (let i = 0; i < book.poems.length; i++) {
    const palette = palettes[getRandomInt(3)];
    randomColorArray.push(palette[makeUniqueRandom(5)]);
  }

  const accessibleContrastPairs = [];

  randomColorArray.map((color) => {
    accessibleContrastPairs.push({
      bgColor: color,
      textColor: getContrastYIQ(color),
    });
  });

  return (
    <>
      <Layout>
        <Header />
        <Content>
          <TileContainer>
            {orderedPoems.map((poem, index) => (
              <li key={poem.poemId}>
                <Link href={`/${currentPage}/${poem.slug}`} passHref>
                  <a>
                    <TitleCard
                      bgColor={accessibleContrastPairs[index].bgColor}
                      textColor={accessibleContrastPairs[index].textColor}
                    >
                      {poem.title}
                    </TitleCard>
                  </a>
                </Link>
              </li>
            ))}
          </TileContainer>
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
