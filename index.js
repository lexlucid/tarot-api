import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()
const PORT = 3000

app.use(express.json())

app.get('/cards', async (req, res) => {
    const cards = await prisma.cards.findMany()
    res.json(cards)
})

app.get('/cards/name/:name', async (req, res) => {
    const { name } = req.params
    const card = await prisma.cards.findFirst({
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
    const cards = await prisma.cards.findMany({
        where: {
            arcana: arcana,
            mode: 'insensitive',
        },
    })
    res.json(cards)
})

app.get('/cards/suit/:suit', async (req, res) => {
    const { suit } = req.params
    const cards = await prisma.cards.findMany({
        where: {
            suit: suit,
            mode: 'insensitive',
        },
    })
    res.json(cards)
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
