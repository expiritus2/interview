const express = require('express');
const PostsController = require('../../controllers/posts');
// const { body } = require('express-validator');
// const validateRequest = require('../../middlewares/validate-request');

const router = express.Router();

const middlewares = [
  // [body('name').not().isEmpty().withMessage('Name is required')],
  // validateRequest,
];

router.get('/posts', PostsController.get);

module.exports = router;
