require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://cmttuqgmhgsxbgrpblkf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const express = require('express')
const app = express()
const PORT = 3000

const getTarotCards = async () => {
    
    let { data: tarot_cards, error } = await supabase
    .from('tarot_cards')
    .select('*')

    if (error) {
        console.log(error)
        return []
    }

    return tarot_cards
    }

const tarotCards = getTarotCards()

const fetchTarotCards = async (req, res, next) => {
    const query = req.query
    req.tarotCards = await getTarotCards(query)
    next()
}

// app.use('/cards', fetchTarotCards)
    
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.get('/cards', async (req, res) => {
    const {data, error} = await supabase
        .from('tarot_cards')
        .select()
    res.send(data)
})

app.get('/cards/:name', async (req, res) => {
    const {data, error} = await supabase
        .from('tarot_cards')
        .select()
        .is('name', req.params.name)
    res.send(data)
})

app.get('/cards/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('tarot_cards')
        .select()
        .is('id', req.params.id)
    res.send(data)
})  


// // get all cards
// app.get('v1/cards', async (req, res) => {
//     console.log(tarotCards)  
//     res.json(tarotCards)    
// })

// get card by name
// app.get('/cards/:name', async (req, res) => {
//     const cardName = req.params.name.toLowerCase()
//     const card = tarotCards.find(card => card.name === cardName)
//     res.json(card)
// })  

// // get cards by arcana
// app.get('/cards/arcana/:arcana', async (req, res) => {
//     const arcana = req.params.arcana.toLowerCase()
//     const cards = tarotCards.filter(card => card.arcana === arcana)
//     res.json(cards)
// })


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})