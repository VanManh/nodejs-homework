const express = require('express');
const router = express.Router();

const homepage = require("../controllers/HomePage");

/* GET home page. */
router.get('/', homepage.index);

module.exports = router;
