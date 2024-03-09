const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  handleNewBlog,
  handleBlogPost,
  handleViewBlogById,
  handleComments,
} = require("../controllers/blog");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  fileName: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", handleNewBlog);
router.post("/", upload.single("coverImage"), handleBlogPost);

router.get("/:id", handleViewBlogById);
router.post("/comment/:blogId", handleComments);

module.exports = router;
