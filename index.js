const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://lexgarey:CYsyYtEAOLEpF4sF@cluster0.unflyuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('tarot_cards');
    const cards = database.collection('cards');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'The Fool' };
    const card = await cards.findOne(query);

    console.log(card);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);