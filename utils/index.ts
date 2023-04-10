import { coffeeStoreType, RecordField } from "../types";

export function isEmpty(obj: Object) {
  return obj && Object.keys(obj).length === 0;
}

function isCoffeeStoreType(
  obj: coffeeStoreType | RecordField
): obj is coffeeStoreType {
  return "location" in obj;
}

export function toAirTableFormat(coffeeStore: coffeeStoreType | RecordField) {
  let id: string;
  let address: string;
  let locality: string;

  if (isCoffeeStoreType(coffeeStore)) {
    // coffeeStore is of type coffeeStoreType
    (id = coffeeStore.fsq_id), (address = coffeeStore.location?.address || "");
    locality = coffeeStore.location?.locality || "";
  } else {
    // coffeeStore is of type RecordField
    (id = coffeeStore.id), (address = coffeeStore.address);
    locality = coffeeStore.location;
  }

  return {
    id: id,
    name: coffeeStore.name,
    address: address,
    location: locality,
    voting: coffeeStore.voting,
    imgUrl: coffeeStore.imgUrl,
  };
}

export function toCoffeeStoreFormat(recordField: RecordField): coffeeStoreType {
  const { id, name, address, location, voting, imgUrl } = recordField;

  return {
    imgUrl: imgUrl,
    fsq_id: id,
    link: "", // No information provided, set to empty string
    location: {
      address: address,
      country: "", // No information provided, set to empty string
      cross_street: "", // No information provided, set to empty string
      formatted_address: "", // No information provided, set to empty string
      locality: location,
      region: "", // No information provided, set to empty string
    },
    voting: voting,
    name: name,
    related_places: {}, // No information provided, set to empty object
    timezone: "", // No information provided, set to empty string
  };
}


export const fetcher = (url: string) => fetch(url).then((res) => res.json());
