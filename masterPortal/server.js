require('dotenv').config({path: process.env.ENV_VAR_PATH});

const swStats = require('swagger-stats');
const http = require('http');
const express = require('express');
const app = express();
const prometheus = require("prometheus-wrapper");
const socketio = require('socket.io');
const zlib = require('zlib');
const axios = require('axios');
const https = require('https');
const fetch = require('node-fetch');

//session mechanism start
var session = require('cookie-session'),
    auth = require('./auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var morgan = require('morgan');
var xFrameOptions = require('x-frame-options');

const OktaEnable = ['stage1', 'stress1', 'production'].includes(process.env.NODE_ENV);

app.use(morgan('combined'));
app.use(compression());
app.use(cookieParser());
app.use(xFrameOptions());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);  
  res.header('Cache-Control', ' no-cache, no-store, must-revalidate, pre-check=0, post-check=0, max-age=0, and s-maxage=0');
  res.header('Expires', '0');
  res.header('Pragma', 'no-cache');
  next()
});

const httpsAgent = new https.Agent({rejectUnauthorized: false});
const axiosInstance = axios.create({httpsAgent});

const jwt = require("jsonwebtoken");
const fcRSAPrivateKey = `${process.env.privateKey}`;

const uuidv4 = require('uuid/v4');

async function getTokenHeader(userTk) {

  let issuedAt = Math.floor(new Date().getTime() / 1000)
  let issuer = 'FUSE_UI'
  let userId = userTk
  let jwtid = uuidv4()

  let encryptedToken = await jwtEncryptor(jwtid, issuer, userId, issuedAt)

  var headers = {
    "Authorization": encryptedToken,
    "Delivery-Date": issuedAt,
    "From": userId,
    "X-Correlation-ID": jwtid,
  };
  return headers;
}

var helmet = require('helmet')
app.use(helmet())

app.use(session({
  name: 'session',
  secret: "process.env.COOKIE_KEY",
  // Cookie Options
  maxAge: 1800000, // 30 min
  // secure: true
}));

app.get('/health', function (req, res) {
  res.json({ status: "UP" });
});

if(!!OktaEnable) {
  app.use(auth.initialize());
  app.use(auth.session());
  app.post('/login/callback', auth.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function (req, res) {
      // var url_to_redirect = req.body.RelayState;
      //temporary workaround get the redirect url in session
      var url_to_redirect = req.session.url_to_redirect;
      var d = new Date();
      var d_time = d.getTime();
      req.session.passport.user.time_sys = d_time;
      
      req.session.url_to_redirect = '';    // clear the url stored in session
      console.log("req.session.url_to_redirect=------------------------------------- ", req.session.url_to_redirect, "--close--");
      if(!!url_to_redirect){
        console.log("url_to_redirect login/callback =------------------------------------- ", url_to_redirect, "--close--");
        res.redirect(url_to_redirect);
      }else{
        res.redirect('/');
      }    
    }
  );

  app.use(swStats.getMiddleware({}));

  app.get('/login', function(req, res) {
    var url_to_redirect = req.query.url_to_redirect;
    // console.log("auth login -----------------------", url_to_redirect ," and --- ", req, "--close--")
    if (!!url_to_redirect && url_to_redirect.startsWith('/')) {
      //temporary workaround set the redirect url in session
      req.session.url_to_redirect = url_to_redirect;
        auth.authenticate('saml',
          {
            additionalParams: {'RelayState': url_to_redirect},
            failureRedirect: '/',
            failureFlash: true
          })(req, res);
      } else {
        res.redirect('/');
      }
  });

  app.use(auth.protected);
}

app.get('/logout', async (req, res) => {
  await req.logout();
  req.user = null;
  req.session = null;
  return res.status(200).send([]);
});

app.get('/getMapBoxToken', function (req, res) {
  res.json({mapBoxToken: process.env.MAPBOX_TOKEN});
});

app.post('/getMerchHierarchy', function(req, res) {
  let {productHeaders, productURL} = req.body;
  axiosInstance({
    method:'get',
    timeout: 60 * 4 * 1000, 
    url:productURL,
    headers: {
      'Authorization': productHeaders['Authorization'],
      'Delivery-Date': productHeaders['Delivery-Date'],
      'From': productHeaders['From'],
      'X-Correlation-ID': productHeaders['X-Correlation-ID']
    },
    proxy: false
  })
    .then(r => {  
      res.status(r.status).send(r.data);
    })
    .catch(e => {
      console.log("getMerchHierarchy - Error", e);
      res.status(500).send([]);
    })
})

app.post('/getDemandDept', function(req, res) {
  let {demandData, demandHeaders, demandURL} = req.body;
  fetch(demandURL, {
    agent: httpsAgent,
    credentials: "include",
    headers: {
      'accept': "application/json, text/plain, */*",
      'accept-language': "en-US,en;q=0.9",
      'authorization': demandHeaders['Authorization'],
      'content-type': "application/json;charset=UTF-8",
      'delivery-date': demandHeaders['Delivery-Date'],
      'from': demandHeaders['From'],
      'sec-fetch-mode': "cors",
      'sec-fetch-site': "same-origin",
      'x-correlation-id': demandHeaders['X-Correlation-ID']
    },
    body: JSON.stringify(demandData),
    method: "POST",
    mode: "cors",
    proxy: false
  })
  .then(response => {
    if (response.status !== 200) {
      res.status(response.status).send([]);
      return;
    }
    response.json().then((data) => {
      const inflatedDemand = zlib.inflateRawSync(new Buffer.from(data, 'base64')).toString() || [];
      res.status(200).send(inflatedDemand);
    })
  })
  .catch(err => {
    console.log("getDemandDept - Error", err);
    res.status(500).send([]);
  })
})

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('/metrics', function(req, res) {
  res.end(prometheus.getMetrics());
});

if(!!OktaEnable) {
  app.get('/userDetails', function (req, res) {
    let userInfo = { firstName: "sid", userGroup: ["App1", "App2"] };
    res.json(userInfo);
  });
  app.get('/authenticateUser', async function (req, res) {
    var tokenHeader = await getTokenHeader(req.session.passport.user.id);
    res.json(tokenHeader)
  });
  app.get('/*', auth.protected, function(req, res) {
    res.sendFile(`${__dirname}/dist/index.html`);
  });
} else {
  app.get('/userDetails', function (req, res) {
  let userInfo = { firstName: "sid", userGroup: ["App1", "App2"] };
    res.json(userInfo);
  });
  app.get('/authenticateUser', async function (req, res) {
    //  var tokenHeader = await getTokenHeader('testuser');
    var tokenHeader = "hello";
    res.json(tokenHeader)
  });
  app.get('/*', function(req, res) {
    res.sendFile(`${__dirname}/dist/index.html`);
  });
  
}

function jwtEncryptor(jwtid, issuer, userId, issuedAt) {
  return new Promise((resolve, reject) => {
    let requestPayload = {
      jwtid: jwtid,
      jti: jwtid,
      issuer: issuer,
      iss: issuer,
    };
    let options = { 
      algorithm: "RS512",
      // expiresIn: 60
      expiresIn: 60 * 60 * 12
     };

    // Generate Digitally signed token with Rsa Private Key
    jwt.sign(requestPayload, fcRSAPrivateKey, options, (err, encryptedToken) => {
      if (err) {
        reject(err)
      } else {
        resolve('Bearer ' + encryptedToken)
      }
    })
  })
}


app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
  return res.sendStatus(204);
  }
  
  return next();
  
  });

const hostPort = process.env.PORT || 17021;
process.title = process.argv[2];

var server = http.createServer(app);
if (!!OktaEnable) {
  var io = socketio(server);
  const host = 'localhost';
  const port = 6379;
  console.log("redis host name -------------- ", host)

  const redis = require('redis');
  const redisAdapter = require('socket.io-redis');
  const pub = redis.createClient(port, host, { auth_pass: "pasword" });
  const sub = redis.createClient(port, host, { auth_pass: "password" });
  const client1 = redis.createClient(port, host, { auth_pass: "password" });
  io.adapter(redisAdapter({ pubClient: pub, subClient: sub }));
  // io.adapter(redisAdapter({ host: host, port: port }));

  io.of('/masternamespace').on('connection', (socket) => {
    socket.on('message-all', (data) => {
        console.log('app1 server message all', data);
        io.of('/masternamespace').emit('message-all', data);

    });

    socket.on('disconnect', function() {
        var tt = {};
        tt.STATE=2;
        tt.message=socket.id;
        console.log( "App 1Got disconnect! and object ", tt);
        io.of('/masternamespace').emit('message-all', JSON.stringify(tt) );
    });

  });
  client1.on('message', function(chan, msg) {
      console.log('data---------------',msg)
      io.of('/masternamespace').emit('POConfirmation', msg);
    //});
  });
  client1.subscribe('POConfirmation');

}

server.listen(hostPort, () => {
  console.log('app listening on', hostPort);
});
