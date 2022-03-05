import React from "react";
import Layout from "../src/components/Layout";
import Header from "../src/components/Header";

import styles from "../styles/global.module.scss";

const about = () => (
  <Layout>
    <Header />
    <main>
      <div className={styles.fullPageHeightCentre}>
        <div className={styles.halfPage}>
          <h2 className={styles.heading}>About</h2>
          <div className={styles.text}>
            <p>
              Bright Ideas is an archive for the poems of Pat Perkins. It
              features previous poetry collections Bright Ideas (2003), More
              Bright Ideas (2008) and a new, previously unpublished collection,
              Bright Ideas in Action written in 2012.
            </p>
            <p>
              This site has been designed and written by Ed Perkins with help
              digitizing the poems from Sara Perkins. As an artist, Pat had a
              love of vibrancy and colour and the site has been designed to
              reflect this, featuring some of her favourites.
            </p>

            <p>
              {
                "We hope that whoever reads these poems enjoys them and finds the ideas in them helpful, as that's what Pat would have wished for them."
              }
            </p>

            <p style={{ fontStyle: "italic", marginTop: "4rem" }}>
              {
                "All images used on the site are taken from Pat's garden where she worked hard and found much happiness."
              }
            </p>
          </div>
        </div>
      </div>
    </main>
  </Layout>
);

export default about;
