export type coffeeStoreType = {
  imgUrl: string;
  fsq_id: number;
  link: string;
  location: {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    region: string;
  };
  name: string;
  related_places: {};
  timezone: string;
};
