import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || "8080"

app.use(express.json())

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

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
