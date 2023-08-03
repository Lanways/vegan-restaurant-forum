const express = require('express')
const app = express()
const port = 3000 || process.env.port

app.get('/', (req, res) => {
  res.send(`hello world!~~~`)
})

app.listen(port, () => {
  console.log(`express server is running on locahost:${port}`)
})