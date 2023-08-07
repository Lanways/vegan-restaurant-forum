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
  postRestaurant: (req, res, next) => {
    adminServices.postRestaurant(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'restaurant was successfully created')
      req.session.createdData = data
      return res.redirect('/admin/restaurants')
    })
  },
  getRestaurant: (req, res, next) => {
    adminServices.getRestaurant(req, (err, data) => {
      err ? next(err) : res.render('admin/restaurant', data)
    })
  },
  editRestaurant: (req, res, next) => {
    adminServices.editRestaurant(req, (err, data) => {
      err ? next(err) : res.render('admin/edit-restaurant', data)
    })
  },
  putRestaurant: (req, res, next) => {
    adminServices.putRestaurant(req, (err, data) => {
      if (err) return next(err)
      req.session.createdData = data
      req.flash('success_messages', 'restaurant was successfully to update')
      return res.redirect('/admin/restaurants')
    })
  },
  deleteRestaurant: (req, res, next) => {
    adminServices.deleteRestaurant(req, (err, data) => {
      if (err) return next(err)
      req.session.deleteData = data
      return res.redirect('/admin/restaurants')
    })
  },
}

module.exports = adminController