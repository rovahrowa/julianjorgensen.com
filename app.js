require('dotenv').config();
let express = require('express');
let session = require('express-session');
let app = module.exports = express();
let bodyParser = require('body-parser');
let logger = require('morgan');
let QuickBooks = require('node-quickbooks');
let expressStaticGzip = require("express-static-gzip");
let request = require('request');
let qs = require('querystring');

// routes
let quickbooks = require('./routes/quickbooks');
let stripe = require('./routes/stripe');
let contentful = require('./routes/contentful');
let toggl = require('./routes/toggl');
let email = require('./routes/email');

// cron jobs
require('./admin/crons/init');

// Set port
app.set('port', (process.env.PORT || 3000));

// site url
const NODE_ENV = (process.env.NODE_ENV || 'development');
const ENV_CONFIG = require('./config/' + NODE_ENV + '.config');

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan


// Quick Books
qbo = new QuickBooks(process.env.QBO_CONSUMER_KEY,
                         process.env.QBO_CONSUMER_SECRET,
                         process.env.QBO_OAUTH_TOKEN,
                         process.env.QBO_OAUTH_TOKEN_SECRET,
                         process.env.QBO_REALM_ID,
                         true, // don't use the sandbox (i.e. for testing)
                         true); // turn debugging on

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session
app.use(session({resave: false, saveUninitialized: false, secret: 'chai'}));

// Stripe routes
app.use('/api/charge', stripe);

// Proposal routes
app.use('/api/proposal', contentful);

// Quickbooks routes
app.use('/api', quickbooks);

// Email routes
app.use('/email', email);

// Toggl routes
app.use('/api/toggl', toggl);

// Serve Gzip
app.use("/", expressStaticGzip(__dirname + '/public'));

// render quickbooks access page
app.get('/qbo/authorize', (req, res) => {
  res.render('intuit.pug', {
    requestUrl: ENV_CONFIG.SITE_URL + '/qbo/requestToken'
  });
});

app.get('/qbo/requestToken', (req, res) => {
  let postBody = {
    url: QuickBooks.REQUEST_TOKEN_URL,
    oauth: {
      callback: ENV_CONFIG.SITE_URL + '/qbo/callback/',
      consumer_key: process.env.QBO_CONSUMER_KEY,
      consumer_secret: process.env.QBO_CONSUMER_SECRET
    }
  }
  console.log(QuickBooks);
  console.log('req.session', req.session);
  console.log('requesting token:', postBody);
  request.post(postBody, function (e, r, data) {
    let requestToken = qs.parse(data)
    req.session.oauth_token_secret = requestToken.oauth_token_secret
    console.log(requestToken)
    res.redirect(QuickBooks.APP_CENTER_URL + requestToken.oauth_token)
  })
});

app.get('/qbo/callback', (req, res) => {
  let postBody = {
    url: QuickBooks.ACCESS_TOKEN_URL,
    oauth: {
      consumer_key:    process.env.QBO_CONSUMER_KEY,
      consumer_secret: process.env.QBO_CONSUMER_SECRET,
      token:           req.query.oauth_token,
      token_secret:    req.session.oauth_token_secret,
      verifier:        req.query.oauth_verifier,
      realmId:         req.query.realmId
    }
  }
  request.post(postBody, function (e, r, data) {
    let accessToken = qs.parse(data)
    res.render('qbo-secrets.pug', {
      accessToken: accessToken.oauth_token,
      accessSecret: accessToken.oauth_token_secret,
      realmId: postBody.oauth.realmId
    });
  });
});

// Catch all other paths and serve the index file
app.all('*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Listen to port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
