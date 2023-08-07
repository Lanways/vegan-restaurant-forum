const { Restaurant, Category, User } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')

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
  createRestaurant: (req, cb) => {
    return Category.findAll({ raw: true })
      .then(categories => cb(null, { categories }))
      .catch(err => cb(err))
  },
  postRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')
    const { file } = req
    imgurFileHandler(file)
      .then(filePath => {
        return Restaurant.create({
          name,
          tel,
          address,
          openingHours,
          description,
          image: filePath || null,
          categoryId
        })
      })
      .then((newRestaurant) => {
        return cb(null, { restaurant: newRestaurant })
      }
      )
      .catch(err => cb(err))
  },
  getRestaurant: (req, cb) => {
    Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurant => {
        if (!restaurant) throw new Error(`Restaurant didn't exist!`)
        return cb(null, { restaurant })
      })
      .catch(err => cb(err))
  },
}

module.exports = adminServices