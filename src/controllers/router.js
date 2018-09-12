const express = require("express");
const router = express.Router();

//import handlers

const home = require('./routes/home');
const chat = require('./routes/chat');
const about = require('./routes/about');
const resources = require('./routes/resources');
const message = require('./routes/message');
const error = require('./routes/error');

//routes

router.get("/", home.get);
router.get("/chat", chat.get);
router.get("/about", about.get);
router.get("/resources", resources.get);
router.post("/send-message", message.post);

//error

router.use(error.get404);
router.use(error.get500);

module.exports = router;
