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
const { getUser } = require('./helpers/auth-helpers')
const passport = require('passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const path = require('path')
const methodOverride = require('method-override')

app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(methodOverride('_method'))

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.listen(port, () => {
  console.log(`express server is running on locahost:${port}`)
})

app.use(routes)

module.exports = app
