const db = require('./config/database')

const app = require('./app')

app.listen(process.env.PORT, async () => {
  await db.sync({ force: true })
  console.log(`Server running on port ${process.env.PORT}`)
})
