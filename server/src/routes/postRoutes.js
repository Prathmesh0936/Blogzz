const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} = require('../controllers/postController');
const auth = require('../middleware/auth');
const { createPostValidator, updatePostValidator } = require('../validators/postValidators');

const router = express.Router();

router.get('/', getPosts);
router.get('/me', auth, getMyPosts);
router.get('/:id', getPostById);
router.post('/', auth, createPostValidator, createPost);
router.put('/:id', auth, updatePostValidator, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;

