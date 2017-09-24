let util = require('../../utils/utils');
let pug = require('pug');
let sendMail = require('../sendMail');

let sendEstimateConfirmation = function(body) {
  let promise = new Promise(function(resolve, reject) {

    let {
      name,
      email,
      project,
      notes
    } = body;

    let contextObject = {
      schemaAction: 'AskAction', //http://schema.org/
      emailSummary: 'Project discovery',
      name: name.split(' ')[0],
      project: project,
      notes: notes
    };

    // send the estimate confirmation to the prospect
    let estimateConfirmation = {
      from: {
        name: 'Julian Jorgensen',
        address: 'me@julianjorgensen.com'
      },
      to: [{
        name: name,
        address: email
      }], // An array if you have multiple recipients.
      subject: project ? project : 'Your project',
      template: {
        name: './admin/emails/templates/estimateConfirmation.pug',
        engine: 'pug',
        context: contextObject
      }
    };
    sendMail(estimateConfirmation);

    // send the estimate request to myself
    let estimateRequest = {
      from: {
        name: name,
        address: email
      },
      to: [{
        name: 'Julian Jorgensen',
        address: 'me@julianjorgensen.com'
      }], // An array if you have multiple recipients.
      subject: project + ' estimate',
      template: {
        name: './admin/emails/templates/estimateRequest.pug',
        engine: 'pug',
        context: contextObject
      }
    };
    sendMail(estimateRequest);
    resolve();
  });

  return promise;
}

module.exports.send = sendEstimateConfirmation;