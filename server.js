require('dotenv').config({
    silent: process.env.NODE_ENV === 'production'
})

const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.error(error.message))


const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const boxesRouter = require('./routes/boxes')
app.use(cors())
app.use('/boxes', boxesRouter)

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)

const commentRouter = require('./routes/comments')
app.use('/comments', commentRouter)

const decksRouter = require('./routes/decks')
const router = require('./routes/boxes')
app.use('/decks', decksRouter)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log('Server Started listening on: ' + PORT))