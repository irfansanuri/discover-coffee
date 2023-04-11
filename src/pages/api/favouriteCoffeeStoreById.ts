import { NextApiRequest, NextApiResponse } from "next";
import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from "../../../lib/airtable";

const favouriteCoffeeStoreById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is missing" });
    }

    const records = await findRecordByFilter(id);
    if (records.length === 0) {
      return res
        .status(404)
        .json({ message: "Coffee store id doesn't exist", id });
    }

    const record = records[0];
    const calculateVoting = parseInt(record.voting.toString()) + 1;

    const updateRecord = await table.update([
      { id: record.recordId, fields: { voting: calculateVoting } },
    ]);
    const minifiedRecords = getMinifiedRecords(updateRecord);

    return res.json(minifiedRecords);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error upvoting coffee store", error });
  }
};

export default favouriteCoffeeStoreById;
