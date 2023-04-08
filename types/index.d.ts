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

export type Position = {
  coords: {
    latitude: any;
    longitude: any;
  };
};

export type StoreProviderProps = {
  children: ReactNode;
};

export type State = {
  latLong: Position | null;
  coffeeStores: coffeeStoreType[];
};

export type Action =
  | { type: "SET_LAT_LONG"; payload: { latLong: Position | null } }
  | { type: "SET_COFFEE_STORES"; payload: { coffeeStores: coffeeStoreType[] } };