const express = require('express');
const MainController = require('../../controllers/main');

const router = express.Router();

router.get('/main', MainController.main);

module.exports = router;
