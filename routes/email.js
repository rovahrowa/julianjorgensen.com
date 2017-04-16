let express = require('express');
let router = express.Router();
let app = require('../server');

let nodemailer = require('nodemailer');
let mg = require('nodemailer-mailgun-transport');
let pug = require('pug');
let htmling = require('htmling');
let juice = require('juice');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
let auth = {
  auth: {
    api_key: 'key-06c8cc25bbde08805918b4e42dcad22f',
    domain: 'mailer.julianjorgensen.com'
  }
}

let nodemailerMailgun = nodemailer.createTransport(mg(auth));


// Invoice reminder email
// let subject = 'Your project';
// let contextObject = {
//   schemaAction: 'AskAction', //http://schema.org/
//   emailSummary: 'Project discovery',
//   alertText: 'Invoice is overdue',
//   name: 'Julian',
//   text: 'I\'m super excited to hear more about your project. In the meantime please fill out this questionaire about your project. This will result in a more thorough quote.',
//   ctaColor: 'warning',
//   ctaText: 'Enter project details',
//   ctaLink: 'https://goo.gl/forms/i8TwGVYpMkrrk5hj2',
//   ctaDisclaimer: '(Takes about 5-10 minutes)'
// };


// Send the invoice
// ===================
router.route('/invoice')
  .post(function (req, res) {
    console.log(req);
    res.status(200).send('Im here');
    // if (req.token == process.env.QBO_WEBHOOK_TOKEN){
    //   console.log('success!');
    //   console.log(req);
    // }
    // let {email, projectName, name} = req.body;

    // let contextObject = {
    //   emailSummary: 'Invoice',
    //   name: name.split(' ')[0],
    //   projectName: projectName,
    // };
    //
    // let mailOptions = {
    //   from: {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
    //   to: [{name:name, address:email}], // An array if you have multiple recipients.
    //   subject: 'Your project',
    //   template: {
    //     name: './emails/estimate.pug',
    //     engine: 'pug',
    //     context: contextObject
    //   }
    // };

    // sendMail(mailOptions);
    // res.status(200).send('success');
  });

// Send the get a quote email to prospect client
// ===================
router.route('/get-a-estimate')
  .post(function (req, res) {
    let {email, projectName, name} = req.body;

    let contextObject = {
      schemaAction: 'AskAction', //http://schema.org/
      emailSummary: 'Project discovery',
      name: name.split(' ')[0],
      projectName: projectName,
    };

    let mailOptions = {
      from: {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
      to: [{name:name, address:email}], // An array if you have multiple recipients.
      subject: 'Your project',
      template: {
        name: './emails/estimate.pug',
        engine: 'pug',
        context: contextObject
      }
    };

    sendMail(mailOptions);
    res.status(200).send('success');
  });

function sendMail(mailOptions){
  nodemailerMailgun.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });
}

module.exports = router;
