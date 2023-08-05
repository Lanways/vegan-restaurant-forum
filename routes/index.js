const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const restaurantController = require('../controllers/restaurant-controller')
const passport = require('../config/passport')
const { authenticated } = require('../middleware/auth')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local',
  {
    failureRedirect: '/signin',
    failureFlash: true
  }), userController.signIn)

router.get('/restaurants', authenticated, restaurantController.getRestaurants)


module.exports = router
