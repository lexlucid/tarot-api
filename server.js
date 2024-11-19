import 'dotenv/config'
import express from "express";
import { MongoClient } from "mongodb";

const app = express()
const PORT = 3000

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('tarot_cards');
    const cards = database.collection('cards');

    // Query for a movie that has the title 'Back to the Future'
    const query = { id: 1};
    const card = await cards.find().toArray();

    console.log(JSON.stringify(card[0].cards));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})