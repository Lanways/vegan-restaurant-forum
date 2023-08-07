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
}

module.exports = adminController