const express = require("express");
const router = express.Router();

//import handlers

const home = require('./routes/home');
const chat = require('./routes/chat');
const about = require('./routes/about');
const resources = require('./routes/resources');
const message = require('./routes/message');
const error = require('./routes/error');
const setitfree = require('./routes/setitfree');
const animation = require('./routes/animation');

//Main routes
router.get("/", home.get);
router.get("/chat", chat.get);
router.get("/about", about.get);
router.get("/resources", resources.get);
router.get("/setitfree", setitfree.get);
router.get("/animation", animation.get);
router.post("/send-message", message.post);

// Special route to cause 500 error in test
if(process.env.NODE_ENV === 'test'){
    router.get("/test500",(req, res, next) => {
        try {
            throw new Error("example error")
        } catch (e) {
            next(e)
        }
    });
}

// error routes
router.use(error.get404);
router.use(error.get500);

module.exports = router;
