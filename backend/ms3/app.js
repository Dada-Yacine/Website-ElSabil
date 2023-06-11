var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

//var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var timetableRouter = require('./routes/timetableRoute');
var absenceRoute = require('./routes/absenceRoute');
var classroomRoute = require('./routes/classroomRoute');
var eventRoute = require('./routes/eventRoute');

var app = express();
mongoose.connect('mongodb://127.0.0.1:27017/ms3');
app.use(cors());
app.disable('etag')
//___
var eurekaHelper = require('./eureka');
var axonClient = require('./axon-client');
axonClient.start();
eurekaHelper.registerWithEureka("ms3", process.env.PORT);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/timetable', timetableRouter);
app.use('/absence', absenceRoute);
app.use('/classroom', classroomRoute);
app.use('/event', eventRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
