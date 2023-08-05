const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const restaurantController = require('../controllers/restaurant-controller')
const passport = require('../config/passport')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const upload = require('../middleware/muter')
const { generalErrorHandler } = require('../middleware/error-handler')
const commentController = require('../controllers/comment-controller')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local',
  {
    failureRedirect: '/signin',
    failureFlash: true
  }), userController.signIn)
  router.get('/users/top', authenticated, userController.getTopUsers)
  router.get('/users/:id', authenticated, userController.getUser)
  router.get('/users/:id/edit', authenticated, userController.editUser)
  router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)
  router.get('/logout', userController.logout)

router.get('/restaurants/top', authenticated, restaurantController.getTopRestaurants)
router.get('/restaurants/feeds', authenticated, restaurantController.getFeeds)
router.get('/restaurants/:id/dashboard', authenticated, restaurantController.getDashboard)
router.get('/restaurants/:id', authenticated, restaurantController.getRestaurant)
router.get('/restaurants', authenticated, restaurantController.getRestaurants)

router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)

router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)

router.delete('/comments/:id', authenticated, authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)

router.use('/', (req, res) => { res.redirect('/restaurants') })
router.use('/', generalErrorHandler)

module.exports = router
