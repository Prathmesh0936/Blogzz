const { validationResult } = require('express-validator');
const Post = require('../models/Post');

const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.details = errors.array();
    throw error;
  }
};

const createPost = async (req, res, next) => {
  try {
    handleValidation(req);
    const { title, content, imageURL } = req.body;

    const post = await Post.create({
      title,
      content,
      imageURL,
      username: req.user.username,
      owner: req.user.id,
    });

    res.status(201).json({ message: 'Post created', data: post });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { username: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Post.countDocuments(query),
    ]);

    res.json({
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: post });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    handleValidation(req);

    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    if (post.owner.toString() !== req.user.id) {
      const error = new Error('Not authorized to update this post');
      error.statusCode = 403;
      throw error;
    }

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    post.imageURL = req.body.imageURL ?? post.imageURL;

    await post.save();
    res.json({ message: 'Post updated', data: post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    if (post.owner.toString() !== req.user.id) {
      const error = new Error('Not authorized to delete this post');
      error.statusCode = 403;
      throw error;
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
};

