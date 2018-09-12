const express = require('express');
const router = express.Router();
const home = require('./routes/home');
router.get("/", home.get);

module.exports = router;