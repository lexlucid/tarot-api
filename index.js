import { PrismaClient } from '@prisma/client'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path' 

const __filename = fileURLToPath(import.meta.url) 
const __dirname = dirname(__filename) 

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 10000

app.use(express.json())

// Serve static files from the Astro build directory
app.use(express.static(path.join(__dirname, 'docs', 'dist')))

app.use((req, res, next) => {
    const originalJson = res.json
    res.json = function (data) {
        data = JSON.parse(JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ))
        originalJson.call(this, data)
    }
    next()
})

// Serve the Astro index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'dist', 'index.html'))
})

app.get('/cards', async (req, res) => {
    const cards = await prisma.tarot_cards.findMany()
    res.json(cards)
})

app.get('/cards/name/:name', async (req, res) => {
    const { name } = req.params
    const card = await prisma.tarot_cards.findFirst({
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            }
        },
    })
    res.json(card)
})

app.get('/cards/arcana/:arcana', async (req, res) => {
    const { arcana } = req.params
    const cards = await prisma.tarot_cards.findMany({
        where: {
            arcana: arcana,
        },
    })
    res.json(cards)
})

app.get('/cards/suit/:suit', async (req, res) => {
    const { suit } = req.params
    const cards = await prisma.tarot_cards.findMany({
        where: {
            suit: suit,
        },
    })
    res.json(cards)
})

app.get('/cards/element/:element', async (req, res) => {
    const { element } = req.params
    const cards = await prisma.tarot_cards.findMany({
        where: {
            element: element,
        },
    })
    res.json(cards)
})

app.get('/cards/random', async (req, res) => {
    const card = await prisma.tarot_cards.findMany({
        take: 1,
        skip: Math.floor(Math.random() * 78)
    })
    res.json(card)
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`)
})
