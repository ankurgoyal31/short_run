import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

let client;

async function getCollection() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
  }
  return client.db("link").collection("urlmodel");
}

export async function GET(req, { params }) {
  const { slug } = params;

  const col = await getCollection();
  const data = await col.findOne({ short: slug });

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.url);
}
