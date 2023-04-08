import { createApi } from "unsplash-js";
import { coffeeStoreType } from "../types";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
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
    perPage: 40,
  });
  const unsplashResults = photos.response?.results.map(
    (result) => result.urls["small"]
  );
  return unsplashResults;
};

export const fetchCoffeeStores = async (
  latLong = "2.2386776%2C102.285377",
  limit = 6
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || "",
    },
  };

  const response = await fetch(
    getUrlForCoffeeStroes(latLong, "coffee", limit),
    options
  );
  const data = await response.json(); //.catch((err) => console.error(err));
  const photos = (await getListfCoffeeStoresImages()) || [];

  return data.results.map((result: coffeeStoreType, index: number) => ({
    ...result,
    imgUrl: photos.length > 0 ? photos[index] : null,
  }));
};
