import dotenv from 'dotenv/config'
import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('tarot_cards');
    const cards = database.collection('cards');

    // Query for a movie that has the title 'Back to the Future'
    const query = { arcana: "major"};
    const card = await cards.findOne(query);

    console.log(card);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);