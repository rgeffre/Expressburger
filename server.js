var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;

var app = express();

//Set up config for serving static content from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

//set up for parser
app.use(bodyParser.urlencoded({ extended: false }));

//Override for POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set up handlebars and view engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: "main.handlebars"}));
app.set('view engine', 'handlebars');

//Import routes for the server to use
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function() {
  console.log("App listening on port " + port);
});

module.exports = app;
