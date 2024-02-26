const express = require('express');
const GenresController = require('../../controllers/Genres');
// const { body } = require('express-validator');
// const validateRequest = require('../../middlewares/validate-request');

const router = express.Router();

// const middlewares = [
//   // [body('name').not().isEmpty().withMessage('Name is required')],
//   // validateRequest,
// ];

router.get('/genres', GenresController.get);

module.exports = router;
