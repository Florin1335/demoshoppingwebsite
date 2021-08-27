"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _categorie = _interopRequireDefault(require("./routere/categorie.js"));

var _cautare = _interopRequireDefault(require("./routere/cautare.js"));

var _autentificare = _interopRequireDefault(require("./routere/autentificare.js"));

var _cos_router = _interopRequireDefault(require("./routere/cos_router.js"));

var _dashboard_admin = _interopRequireDefault(require("./routere/dashboard_admin.js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoDBStore = require('connect-mongodb-session')(_expressSession.default);

const PORT = process.env.PORT || 3001;

_mongoose.default.connect(process.env.mongodbUrl || 'mongodb://localhost:27017/bazaDeDate', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Server conectat la mongodb.');
}).catch(error => {
  console.log(error.reason);
});

const server = (0, _express.default)();
server.use(_express.default.static(_path.default.join(__dirname, '../client', 'build')));
server.use(_express.default.json());
const stocare_sesiuni = new MongoDBStore({
  uri: process.env.mongodbUrl,
  collection: 'sesiuni'
});
server.use((0, _expressSession.default)({
  secret: process.env.sessionSecret || 'FlorinLicentaTW1335',
  resave: false,
  saveUninitialized: false,
  store: stocare_sesiuni,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));
server.use('/db', _categorie.default);
server.use('/cautare', _cautare.default);
server.use('/autentificare', _autentificare.default);
server.use('/cos', _cos_router.default);
server.use('/dashboard_admin', _dashboard_admin.default);
server.use((err, req, res, next) => {
  res.send({
    message: err.message
  });
});
server.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '../client', 'build', 'index.html'));
});
server.listen(PORT, 'localhost', () => {
  console.log('Server creat pe portul ' + PORT);
});