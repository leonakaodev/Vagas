const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')

const app = express()
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on http://localhost:${process.env.SERVER_PORT}`)
})
