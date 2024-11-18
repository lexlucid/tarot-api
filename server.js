require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://cmttuqgmhgsxbgrpblkf.supabase.co/'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const express = require('express')
const app = express()
const PORT = 3000

const getTarotCards = async () => {
    
    const { data: tarot_cards, error } = await supabase
    .from('tarot_cards')
    .select('*')

    if (error) {
        console.log('Error fetching tarot cards', error)
        return []
    }
    return tarot_cards
    }

const tarotCards = getTarotCards()

// app.use('/', fetchTarotCards)
    
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/cards', async (req, res) => {
    const tarotCards = await tarotCards()
    res.json(tarotCards)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})