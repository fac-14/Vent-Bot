var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var router = require('./controllers/router')
// set up server
var app = express();

//set up handlebars + port

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "hbs");
app.engine("hbs", handlebars({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main"
}));

//routes

app.use(router);

app.listen(app.get('port'), () => {
    console.log('Hello World');
})