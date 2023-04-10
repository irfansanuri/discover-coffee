export type coffeeStoreType = {
  imgUrl: string;
  fsq_id: string;
  link: string;
  location: {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    region: string;
  };
  voting: number;
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

export type RecordType = {
  id: string;
  fields: RecordField;
};

export type RecordField = {
  id: string;
  name: string;
  address: string;
  location: string;
  voting: number;
  imgUrl: string;
};
