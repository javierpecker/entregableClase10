"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _rutas = _interopRequireDefault(require("./routes/rutas.js"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var puerto = 8080;
var server = app.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
server.on('error', function (err) {
  console.log('ERROR ATAJADO', err);
});

var layoutFolderPath = _path["default"].resolve(__dirname, '../views/layouts');

var defaultLayerPath = _path["default"].resolve(__dirname, '../views/layouts/index.hbs');

var partialFolderPath = _path["default"].resolve(__dirname, '../views/partial');

app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: layoutFolderPath,
  partialsDir: partialFolderPath,
  defaultLayout: defaultLayerPath,
  extname: 'hbs'
}));

var publicPath = _path["default"].resolve(__dirname, '../public');

app.use(_express["default"]["static"](publicPath));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use('/api', _rutas["default"]);