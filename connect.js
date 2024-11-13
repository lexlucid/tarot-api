require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://cmttuqgmhgsxbgrpblkf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const getTarotCards = async () => {
    const { data, error } = await supabase
      .from('tarot_cards')
      .select()
    
      console.log(data)
}

getTarotCards()
