const express = require('express')
const app = express()
const port = 3000 || process.env.PORT

const handlebars = require('express-handlebars')

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`express server is running on locahost:${port}`)
})