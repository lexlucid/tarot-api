const express = require('express')
const app = express() 
const PORT = 3000

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
    const card = tarotCards.cards.find(card => card.suit.toLowerCase() === suitName)
   
    if (card) {
        res.json(card)
    } else {
        res.status(404).send('Card not found')
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