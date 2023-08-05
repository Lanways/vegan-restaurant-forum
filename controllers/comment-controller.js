const commentServices = require('../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.newComment.restaurantId}`))
  }
}

module.exports = commentController