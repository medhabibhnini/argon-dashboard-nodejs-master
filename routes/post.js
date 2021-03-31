const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const {
  createPostValidator,
  searchForPostValidator,
  addCommentValidator,
} = require("../middleware/express-validator/expressValidator");
const getPosts = require("../functions/ForumFunctions/getPosts");
const getMostLikedPosts = require("../functions/ForumFunctions/getMostLikedPosts");
const getPostsByDate = require("../functions/ForumFunctions/getPostsByDate");
const getMostCommented = require("../functions/ForumFunctions/getMostCommented");
const getSinglePost = require("../functions/ForumFunctions/getSinglePost");
const getUserPostsByMiddleware = require("../functions/ForumFunctions/getUserPostsByMiddleware");
const getUserPostsById = require("../functions/ForumFunctions/getUserPostsById");
const createPost = require("../functions/ForumFunctions/createPost");
const searchForPost = require("../functions/ForumFunctions/searchForPost");
const addLike = require("../functions/ForumFunctions/addLike");
const addComment = require("../functions/ForumFunctions/addComment");
const likeComment = require("../functions/ForumFunctions/likeComment");
const removePost = require("../functions/ForumFunctions/removePost");
const removeLikeFromPost = require("../functions/ForumFunctions/removeLikeFromPost");
const removeComment = require("../functions/ForumFunctions/removeComment");
const removeLikeFromComment = require("../functions/ForumFunctions/removeLikeFromComment");
const auth = require("../middleware/auth");

router.get("/posts", getPosts);

router.get("/posts/most_liked", getMostLikedPosts);

router.get("/posts/the_most_recent", getPostsByDate);

router.get("/posts/the_most_commented", getMostCommented);

router.get("/single_post/:post_id", getSinglePost);

router.get("/user_posts/:user_id", getUserPostsById);

router.get("/user_posts", auth, getUserPostsByMiddleware);

router.post("/createpost", auth, createPostValidator, createPost);

router.put("/search_for_post", searchForPostValidator, searchForPost);

router.put("/likes/:post_id", auth, addLike);

router.put(
  "/add_comment/:post_id",
  auth,
  addCommentValidator,
  addComment
);

router.put("/like_comment/:post_id/:comment_id", auth, likeComment);

router.delete("/delete_post/:post_id", auth, removePost);

router.delete(
  "/remove_like_from_post/:post_id/:like_id",
  auth,
  removeLikeFromPost
);

router.delete(
  "/remove_comment/:post_id/:comment_id",
  auth,
  removeComment
);

router.delete(
  "/remove_like_from_comment/:post_id/:comment_id/:like_id",
  auth,
  removeLikeFromComment
);

module.exports = router;
