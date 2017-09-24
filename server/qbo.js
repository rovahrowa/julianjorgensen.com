let express = require('express');
let session = require('express-session');


// session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'chai'
}));


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
  request.post(postBody, function(e, r, data) {
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
      consumer_key: process.env.QBO_CONSUMER_KEY,
      consumer_secret: process.env.QBO_CONSUMER_SECRET,
      token: req.query.oauth_token,
      token_secret: req.session.oauth_token_secret,
      verifier: req.query.oauth_verifier,
      realmId: req.query.realmId
    }
  }
  request.post(postBody, function(e, r, data) {
    let accessToken = qs.parse(data)
    res.render('qbo-secrets.pug', {
      accessToken: accessToken.oauth_token,
      accessSecret: accessToken.oauth_token_secret,
      realmId: postBody.oauth.realmId
    });
  });
});
