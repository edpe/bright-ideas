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
              features previous poetry collections Bright Ideas (2001), More
              Bright Ideas (2004) and a new, previously unpublished collection,
              Bright Ideas in Action written in 2013.
            </p>
            <p>
              This site has been designed and written by her son, Ed Perkins
              with help from her daughter Sara Perkins who did a lot of the
              typing.
            </p>
            <p>
              {
                "We hope that whoever reads these poems enjoys them and finds the ideas in them helpful, as that's what Pat would have wished for them."
              }
            </p>
          </div>
        </div>
      </div>
    </main>
  </Layout>
);

export default about;
