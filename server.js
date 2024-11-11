const { MongoClient } = require("mongodb") 
const express = require('express')
const app = express() 
const PORT = 3000
const uri = "mongodb+srv://lexgarey:CYsyYtEAOLEpF4sF@cluster0.unflyuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri)

async function run() {
    try {
      const database = client.db('tarot_cards');
      const cards = database.collection('cards');
      // Query for a card by name
      const query = { name: 'The Fool' };
      const card = await cards.findOne(query);
      console.log(card);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

const tarotCards = require('./tarot-cards.json')
const cards = tarotCards.cards

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// get all cards
app.get('/v1/cards', (req, res) => {
    res.json(tarotCards)
})

// get card by name
app.get('/v1/cards/:name', (req, res) => {
    const cardName = req.params.name.toLowerCase()
    const card = tarotCards.cards.find(card => card.name.toLowerCase() === cardName)
   
    if (card) {
        res.json(card)
    } else {
        res.status(404).send('Card not found')
    }
})

// gets cards by suit
app.get('/v1/cards/suit/:suit', (req, res) => {
    const suitName = req.params.suit.toLowerCase()
    const cards = tarotCards.cards.filter(card => card.suit && card.suit.toLowerCase() === suitName)
   
    if (cards.length > 0) {
        res.json(cards)
    } else {
        res.status(404).send('Suit not found')
    }
})

app.get('/v1/cards/arcana/:arcana', (req, res) => {
    const arcana = req.params.arcana.toLowerCase()
    const cards = tarotCards.cards.filter(card => card.arcana.toLowerCase() === arcana)
   
    if (cards.length > 0) {
        res.json(cards)
    } else {
        res.status(404).send('Arcana not found')
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})