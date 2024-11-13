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

const fetchTarotCards = async (req, res, next) => {
    req.tarotCards = await getTarotCards()
    next()
}

app.use('/v1/cards', fetchTarotCards)
    
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



// get all cards
app.get('/v1/cards', async (req, res) => {
    console.log(tarotCards)
    res.json(tarotCards)
})

// get card by name


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})