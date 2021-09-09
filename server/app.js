var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const { Sequelize } = require('sequelize');
const DefaultDataInits = require('./default-data/default-data.js');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const initModelsAndData = require('./default-data/default-data.js');
var app = express();
require('./routes/routes.game-object.ts')(app);
require('./routes/routes.item.ts')(app);
const sequelize = new Sequelize('game', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
  }
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/api/gameObject', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.use(logger('dev'));
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'game'
})




connection.connect(error => {
  if(error) {
    throw(error);
  } else {
    try {
      sequelize.authenticate().then(async () => {
        try {
          initModelsAndData.initModels(sequelize);
          await sequelize.sync({force: true});
          initModelsAndData.initData();
        } catch(error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    console.log("Success!");
  }
})


module.exports = app;
