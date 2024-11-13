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
    
    return tarot_cards
    }
    
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// get all cards
app.get('/v1/cards', async (req, res) => {
    const tarotCards = await getTarotCards()
    console.log(tarotCards)
    res.json(tarotCards)
})

// get card by name


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})