const get404 = (req, res, next) => {
    res.status('404')
    res.render("error", {error : "404"});
}

const get500 = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500);
    res.render("error", {error : "500"});
}

module.exports = {get404, get500};