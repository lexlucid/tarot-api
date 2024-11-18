import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://lexgarey:E1OwResn7HD6Cj7M@cluster0.unflyuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("tarot_cards")
    const tarotCards = database.collection("cards")

    // Query for a card called "The Fool"
    const query = {name: "The Fool"}

    // const options = {
    //   // Sort matched documents in descending order by rating
    //   sort: { "imdb.rating": -1 },
    //   // Include only the `title` and `imdb` fields in the returned document
    //   projection: { _id: 0, title: 1, imdb: 1 },
    // };

    // Execute query
    const cards = await tarotCards.find().toArray()

    // Print the document returned by findOne()
    console.log(JSON.stringify(cards));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
