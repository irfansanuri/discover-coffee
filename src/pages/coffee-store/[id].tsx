import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { coffeeStoreType, RecordField } from "../../../types";
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import Link from "next/link";
import { fetchCoffeeStores } from "../../../lib/coffee_store";
import { StoreContext } from "../../../store/store-context";
import {
  fetcher,
  isEmpty,
  toAirTableFormat,
  toCoffeeStoreFormat,
} from "../../../utils";
import axios from "axios";
import useSWR from "swr";

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores();

  const params = context.params;

  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore: coffeeStoreType) => {
      return coffeeStore.fsq_id.toString() === params?.id;
    }
  );

  const coffeeStore = findCoffeeStoreById;

  return {
    props: {
      coffeeStore: coffeeStore || {},
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores?.map((coffeeStore: coffeeStoreType) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

const CoffeeStore = (initialProps: { coffeeStore: coffeeStoreType }) => {
  const router = useRouter();

  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const [votingCount, setVotingCount] = useState(0);
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const {
    name = "",
    imgUrl,
    location = {
      address: "",
      country: "",
      cross_street: "",
      formatted_address: "",
      locality: "",
      region: "",
    },
  } = coffeeStore;

  const handleCreateCoffeeStore = async (coffeeStore: RecordField) => {
    try {
      const { id, name, voting = 0, imgUrl, location, address } = coffeeStore;

      const response = await axios.post("/api/createCoffeeStore", {
        id,
        name,
        voting,
        imgUrl,
        location: location || "",
        address: address || "",
      });
    } catch (err) {
      console.error("Error creating coffee store", err);
    }
  };

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch("/api/favouriteCoffeeStoreById", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const dbCoffeeStore = await response.json();

      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        let count = votingCount + 1;
        setVotingCount(count);
      }
    } catch (err) {
      console.error("Error upvoting the coffee store", err);
    }
  };

  useEffect(() => {
    if (isEmpty(coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (coffeeStore: coffeeStoreType) => {
            return coffeeStore.fsq_id.toString() === id; //dynamic id
          }
        );
        setCoffeeStore(findCoffeeStoreById);

        const coffeeStoreAirTable = toAirTableFormat(findCoffeeStoreById);
        handleCreateCoffeeStore(coffeeStoreAirTable);
      }
    } else {
      // SSG
      const coffeeStoreAirTable = toAirTableFormat(coffeeStore);
      handleCreateCoffeeStore(coffeeStoreAirTable);
    }
  }, [id, coffeeStore, coffeeStores]);

  useEffect(() => {
    if (data && data.length > 0) {
      const coffeeStore = toCoffeeStoreFormat(data[0]);
      setCoffeeStore(coffeeStore);
      setVotingCount(coffeeStore.voting);
    }
  }, [data]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          {location.address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className={styles.text}>{location.address || ""}</p>
            </div>
          )}
          {location.locality && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="near me icon"
              />
              <p className={styles.text}>{location.locality || ""}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
