import { createApi } from "unsplash-js";
import { coffeeStoreType } from "../types";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
});

const getUrlForCoffeeStroes = (
  latLong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListfCoffeeStoresImages = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response?.results.map(
    (result) => result.urls["small"]
  );
  return unsplashResults;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.PUBLIC_FOURSQUARE_API_KEY || "",
    },
  };

  const response = await fetch(
    getUrlForCoffeeStroes("2.2386776%2C102.285377", "coffee", 6),
    options
  );
  const data = await response.json(); //.catch((err) => console.error(err));
  const photos = (await getListfCoffeeStoresImages()) || [];

  return data.results.map((result: coffeeStoreType, index: number) => ({
    ...result,
    imgUrl: photos.length > 0 ? photos[index] : null,
  }));
};
