const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const categoryController = require('../../controllers/category-controller')

router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants', adminController.getRestaurants)

router.get('/categories', categoryController.getCategories)

router.get('/users', adminController.getUsers)

router.use('/', (req, res) => {
  res.redirect('/admin/restaurants')
})

module.exports = router