exports.post = (req, res) => {
    console.log(req.body);
    res.redirect(302, '/chat');
    res.end();
}