const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/activity-groups', require('./routes/activity-route'))

app.use('/todo-items', require('./routes/todo-route'))

module.exports = app
