import { fetchCoffeeStores } from "../../../lib/coffee_store";
import { NextApiRequest, NextApiResponse } from "next";

const getCoffeeStoresByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(
      latLong as string,
      +(limit as string)
    );
    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(200);
    res.json({ message: "Oh no! Something went wrong!", err });
  }
};

export default getCoffeeStoresByLocation;
