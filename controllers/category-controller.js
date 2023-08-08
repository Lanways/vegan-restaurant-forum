const categoryServices = require('../services/category-service')

const categoryController = {
  getCategories: (req, res, next) => {
    categoryServices.getCategories(req, (err, data) => {
      err ? next(err) : res.render('admin/categories', data)
    })
  },
  postCategory: (req, res, next) => {
    categoryServices.postCategory(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'category was successfully created')
      req.session.createdData = data
      return res.redirect('/admin/categories')
    })
  },
}

module.exports = categoryController