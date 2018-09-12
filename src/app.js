const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')

const router = require('./controllers/router')
// set up server
const app = express();
const port = process.env.PORT || 3000;
//set up handlebars + port

app.set('port', port);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "hbs");
app.engine("hbs", handlebars({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main"
}));

//routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router);

module.exports = app;