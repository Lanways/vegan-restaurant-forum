if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const routes = require('./routes')
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())


app.listen(port, () => {
  console.log(`express server is running on locahost:${port}`)
})

app.use(routes)

module.exports = app
