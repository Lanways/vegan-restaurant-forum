if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const handlebars = require('express-handlebars')
const redis = require("redis")
const session = require('express-session')
const flash = require('connect-flash')
const { getUser } = require('./helpers/auth-helpers')
const passport = require('passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const path = require('path')
const methodOverride = require('method-override')

const RedisStore = require("connect-redis")(session)

let client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379
})

client.on('ready', () => {
  console.log('Redis client is ready.')
})

client.on('connect', () => {
  console.log('Redis client has connected to the server.')
})

client.on('error', (err) => {
  console.error('Redis error:', err)
})

client.on('end', () => {
  console.error('Redis connection closed.')
})


app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(methodOverride('_method'))
app.use(session({
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`express server is running on locahost:${port}`)
})

module.exports = app
