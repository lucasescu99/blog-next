import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(mongoURI);
const db = client.db();

export default db;