require('dotenv').config();
let express = require('express');
let app = module.exports = express();
let path = require('path');
let bodyParser = require('body-parser');
let logger = require('morgan');
let QuickBooks = require('node-quickbooks');
let expressStaticGzip = require("express-static-gzip");
let request = require('request');
let qs = require('querystring');

// routes
let qboItem = require('./routes/qboItem');
let qboWebhook = require('./routes/qboWebhook');
let stripe = require('./routes/stripe');
let contentful = require('./routes/contentful');
let toggl = require('./routes/toggl');
let email = require('./routes/email');

let util = require('./utils/utils');
let ENV_CONFIG = util.getEnvConfig();
console.log('Site url: ', ENV_CONFIG.SITE_URL);

global.appRoot = path.join(__dirname, '../');

// cron jobs
require('./crons/init');

// Set port
app.set('port', (process.env.PORT || 3000));

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan


// Quick Books
qbo = new QuickBooks(process.env.QBO_CONSUMER_KEY,
  process.env.QBO_CONSUMER_SECRET,
  process.env.QBO_OAUTH_TOKEN,
  process.env.QBO_OAUTH_TOKEN_SECRET,
  process.env.QBO_REALM_ID,
  ENV_CONFIG.ENV === 'development' ? true : false, // use the sandbox?
  ENV_CONFIG.ENV === 'development' ? true : false); // turn debugging on?

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Stripe routes
app.use('/api/stripe', stripe);

// Proposal routes
app.use('/api/proposal', contentful);

// Quickbooks routes
app.use('/api/qbo/item', qboItem);

// Quickbooks routes
app.use('/api/qbo/webhook', qboWebhook);

// Email routes
app.use('/email', email);

// Toggl routes
app.use('/api/toggl', toggl);

// Serve Gzip
app.use("/", expressStaticGzip(path.join(appRoot, 'public')));

// Catch all other paths and serve the index file
app.all('*', function(request, response) {
  response.sendFile(path.join(appRoot, 'public/index.html'));
});

// Listen to port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


module.exports = app;
