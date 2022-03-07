export type Poem = {
  id: string;
  title: string;
  text: string;
  poemId: string;
  slug: string;
};

export type Book = {
  id: string;
  title: string;
  poems: Poem[];
  slug: string;
};
