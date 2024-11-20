import 'dotenv/config'
import express from "express";
import mongoose from 'mongoose';
import Card from './schema.js';

const app = express()
const PORT = 3000

mongoose.connect(process.env.MONGODB_URI)
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  app.get('/cards', async (req, res) => {
    try {
      const cards = await Card.find()
      console.log(cards)
      res.send(cards)
    } catch (error) {
      res.json({ error: error.message })
    }
  })


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})