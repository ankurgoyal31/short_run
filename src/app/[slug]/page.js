"use server";

import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();

 let client = false;

const connectMongo = async () => {
  if (client) return client;

  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client;
};

async function mongodb() {
  const client = await connectMongo();
  const db = client.db("link");
  const Um = db.collection("urlmodel");
  return Um;
}

 export const mong = async (name, d) => {
  const Um = await mongodb();

  let url = name;
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  const data = await Um.findOne({ url });

  if (data) {
    await Um.updateOne(
      { url },
      { $set: { short: d } });
    return;
  }

  await Um.insertOne({ url, short: d, s: 1 });
};
