const adminServices = require('../services/admin-services')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('admin/restaurants', data))
  },
  getUsers: (req, res, next) => {
    adminServices.getUsers(req, (err, data) => {
      err ? next(err) : res.render('admin/users', data)
    })
  },
  createRestaurant: (req, res) => {
    adminServices.createRestaurant(req, (err, data) => {
      err ? next(err) : res.render('admin/create-restaurant', data)
    })
  },
}

module.exports = adminController