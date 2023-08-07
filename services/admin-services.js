const { Restaurant, Category, User } = require('../models')

const adminServices = {
  getRestaurants: (req, cb) => {
    Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => {
        return cb(null, {
          restaurants
        })
      })
      .catch(err => cb(err))
  },
  getUsers: (req, cb) => {
    return User.findAll()
      .then(users => {
        users = users.map(user => {
          user = user.toJSON()
          delete user.password
          return user
        })
        return cb(null, { users })
      })
      .catch(err => cb(err))
  },
}

module.exports = adminServices