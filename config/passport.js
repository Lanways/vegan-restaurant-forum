const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User, Restaurant } = require('../models')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, cb) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          req.session.input = req.body
          return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
        }
        bcrypt.compare(password, user.password).then(res => {
          if (!res) {
            req.session.input = req.body
            return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          }
          return cb(null, user)
        })
      })
  }
))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const { name, email } = profile._json
  User.findOne({ where: { email } })
    .then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => done(null, user))
        .catch(err => done(err, false))
    })
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  return User.findByPk(id, {
    include: [
      { model: Restaurant, as: 'FavoritedRestaurants' },
      { model: Restaurant, as: 'LikedRestaurants' },
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }
    ]
  })
    .then(user => cb(null, user.toJSON()))
    .catch(err => cb(err))
})

module.exports = passport