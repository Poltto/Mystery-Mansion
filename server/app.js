var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const { graphqlHTTP } = require('express-graphql');
const { Sequelize } = require('sequelize');
const DefaultDataInits = require('./default-data/default-data.js');
const initModelsAndData = require('./default-data/default-data.js');
const https = require('https');
const { ApolloServer } = require('apollo-server-express');

var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// require('./routes/routes.game-object.js')(app);
// require('./routes/routes.item.js')(app);
// require('./routes/routes.item-slot.js')(app);
const sequelize = new Sequelize('game', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
  }
});


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

let server;


async function startServer() {
  server = new ApolloServer({
    modules: [
      require('./graphql/graphql-gameObject')
    ]
  });
  await server.start();
  server.applyMiddleware({app});
}
startServer();

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
          console.log("Inited models, now initing sequelize");

          sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
            sequelize
              .sync({
                force: true
              }).then(function() {
              sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(function() {
                initModelsAndData.initData();
              });

            }, function(err) {
              console.log(err);
            });
          }, function(ee) {
            console.log(err);
          });

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

// app.use('/graphql', graphqlHTTP({
//   schema: graphqlSchema,
//   rootValue: graphqlRoot,
//   graphiql: true,
// }));

module.exports = app;
