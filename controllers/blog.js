const Blog = require("../models/blog");
const Comment = require("../models/comment");
const express = require("express");

async function handleNewBlog(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}

async function handleBlogPost(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}

async function handleViewBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log("comments", comments);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
}

async function handleComments(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
  handleNewBlog,
  handleBlogPost,
  handleViewBlogById,
  handleComments,
};
