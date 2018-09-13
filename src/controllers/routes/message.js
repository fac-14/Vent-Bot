exports.post = (req, res) => {
    const message = req.body.message;
    console.log(message);
    // send message to Dialog Flow API

    res.redirect(302, '/chat');
    res.end();
}