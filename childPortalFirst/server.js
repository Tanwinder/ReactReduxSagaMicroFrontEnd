require('dotenv').config({ path: process.env.ENV_VAR_PATH });
const swStats = require('swagger-stats');
const express = require('express');
const app = express();
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var morgan = require('morgan');
var xFrameOptions = require('x-frame-options');

app.use(morgan('combined'));
app.use(compression());
app.use(cookieParser());
app.use(xFrameOptions());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  name: 'session-pds',
  secret: 'Its secret',
  maxAge: 1800000 // 30 min
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, delivery-date, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(swStats.getMiddleware({}));
app.use(express.static('./'));
app.use(express.static('dist'));
app.get('/health', function (req, res) {
  res.json({ status: "UP" });
});

app.get("/version", function (req, res) {
  res.status(200).json({ "version": !!process.env.APPLICATION_VERSION ? process.env.APPLICATION_VERSION : "1.0.0.0-SNAPSHOT"   });
});

app.get('/metrics', function (req, res) {
  res.end(prometheus.getMetrics());
});

app.get('/rocOrderOptimizationUrls', function (req, res){
  res.json({})
})

app.get('/*', function (req, res) {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});

const port = process.env.PORT || 3000;
process.title = process.argv[2];

app.listen(port, () => {
  console.log('app listening on', port);
});