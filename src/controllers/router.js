const express = require('express');
const router = express.Router();
const home = require('./routes/home');
const chat = require('./routes/chat');
const about = require('./routes/about');
const resources = require('./routes/resources');

router.get("/", home.get);
router.get("/chat", chat.get);
router.get("/about", about.get);
router.get("/resources", resources.get);

module.exports = router;