import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/Banner";
import Card from "@/components/Card";
import coffeeStores from "../../data/coffee-stores.json";
import { coffeeStoreType } from "../../types";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { coffeeStores },
  };
};

const Home = (props: { coffeeStores: Array<coffeeStoreType> }) => {
  function handleOnBannerBtnClick() {
    console.log("CLICK!");
  }

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Discover your local coffee shops!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          handleOnClick={handleOnBannerBtnClick}
          buttonText="View shops nearby"
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
