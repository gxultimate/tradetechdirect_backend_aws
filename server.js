var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var accountRouter = require('./routes/accountRoute');
var productRouter = require('./routes/productRoute');
var distributorRouter = require('./routes/distributorRoute')
var inventoryRouter = require('./routes/inventoryRoute')
var stockRouter = require('./routes/stockRoute')
var cartRouter = require('./routes/cartRoute')
var routes = require('./routes/index')
var bodyParser = require("body-parser")
var compression = require('compression')
var connectDB = require('./connection')
var helmet = require('helmet')
var app = express();

const Port  = process.env.Port || 5000 ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(helmet())
app.use('/public', express.static('public'));

app.use('/api' , routes)

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

connectDB();
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

