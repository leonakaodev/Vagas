const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()
const { errors } = require('celebrate');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on http://localhost:${process.env.SERVER_PORT}`)
})