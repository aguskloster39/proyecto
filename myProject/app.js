var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/sensor', { useNewUrlParser: true, useUnifiedTopology: true });


  const sensorSchema = new Schema({
    sensorId: String,
    date: { type: Date, default: Date.now },
  });
  const measure = mongoose.model("measure", sensorSchema);

  var createAndSavemeasure = function(done) {
    var defaultMeasure = new measure({sensorId: "first"});
  
    defaultMeasure.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
  };
  var findMeasure = function(measureName, done) {
    Person.find({name: measureName}, function (err, measureFound) {
      if (err) return console.log(err);
      done(null, measureFound);
    });
  };



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/submit", function(req, res){
  console.log("hola");
  createAndSavemeasure;
  res.end();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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





 
module.exports = app;


