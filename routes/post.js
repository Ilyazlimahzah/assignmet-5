const express = require("express");

const postRouter = express.Router();

const {
  getBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
  getBookmarks,
  getMyBlog,
  addBookmark,
} = require("../controllers/postControl");

const { verifyPostOwner, tokenVerification } = require("../middleware/middlewares");
const { PostBlogValidation, UpdateBlogValidation } = require("../middleware/validators/post.validator.js");

postRouter.get("/", getBlogs);

postRouter.get(
  "/me",
  tokenVerification,
  getMyBlog
);

postRouter.get("/:id", getBlog)

postRouter.patch(
  "/:id",
    UpdateBlogValidation,
    tokenVerification,
    verifyPostOwner,
    updateBlog
);
postRouter.post(
  "/",
    PostBlogValidation,
    tokenVerification,
    postBlog
);
postRouter.delete(
  "/:id",
  tokenVerification,
  verifyPostOwner,
  deleteBlog
);

module.exports = postRouter;
