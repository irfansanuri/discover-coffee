import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import { coffeeStoreType } from "../../types";
import { GetStaticProps } from "next";
import { fetchCoffeeStores } from "../../lib/coffee_store";
import useTrackLocation from "../../hooks/use-track-location";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";
import axios from "axios";

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: { coffeeStores },
  };
};

const Home = (props: { coffeeStores: Array<coffeeStoreType> }) => {
  const [coffeeStoresError, setCoffeeStoresError] = useState("");

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latLong) {
          const response = await axios.get("/api/getCoffeeStoresByLocation", {
            params: {
              latLong,
              limit: 30,
            },
          });
          const coffeeStores = response.data;

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          });
          setCoffeeStoresError("");
        }
      } catch (error) {
        setCoffeeStoresError((error as Error).message);
      }
    };

    fetchData();

    return () => {};
  }, [latLong, dispatch]);

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
          handleOnClick={handleTrackLocation}
          buttonText={
            isFindingLocation ? locationErrorMsg : "View shops nearby"
          }
        />
        {isFindingLocation
          ? locationErrorMsg
          : locationErrorMsg && (
              <p className={styles.errorMessage}>
                Something went wrong: {locationErrorMsg}
              </p>
            )}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Shops near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore: coffeeStoreType) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Malacca shops</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
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
