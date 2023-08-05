const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const restaurantController = require('../controllers/restaurant-controller')
const passport = require('../config/passport')
const { authenticated } = require('../middleware/auth')
const upload = require('../middleware/muter')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local',
  {
    failureRedirect: '/signin',
    failureFlash: true
  }), userController.signIn)
router.get('/logout', userController.logout)
router.get('/users/:id', authenticated, userController.getUser)
router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)
router.get('/restaurants', authenticated, restaurantController.getRestaurants)

router.use('/', (req, res) => { res.redirect('/restaurants') })

module.exports = router
