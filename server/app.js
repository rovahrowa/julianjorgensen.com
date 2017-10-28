import path from 'path';
import compression from 'compression';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';

// import './crons/init';
import stripe from './routes/stripe';
import * as contentful from './routes/contentful';
import * as qbo from './routes/qbo';
import sendEmail from './routes/sendEmail';

global.appRoot = path.join(__dirname, '../');
const app = express();
app.use(compression());

// Set port
app.set('port', (process.env.PORT || 3000));

app.use(logger('dev')); // Log requests to API using morgan

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// cors
app.use(cors({
  origin: true,
}));

// Stripe routes
app.get('/stripe/charge', stripe);

// Proposal routes
app.get('/get-proposal/:id', contentful.getProposal);
app.get('/get-proposal-preview/:id', contentful.getProposalPreview);

// Quickbooks routes
app.get('/get-billing-item/:type/:id/', qbo.itemDetails);
app.post('/qbo-webhook/', qbo.webhook);

// Email routes
app.get('/email', sendEmail);

// use static
app.use(express.static(path.join(global.appRoot, 'public')));

// Catch all other paths and serve the index file
app.all('*', function(request, response) {
  response.sendFile(path.join(global.appRoot, 'public/index.html'));
});

// Listen to port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
