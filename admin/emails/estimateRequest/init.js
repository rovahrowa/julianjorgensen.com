let util = require('../../../util/util');
let pug = require('pug');

function sendEstimateConfirmation(){
  let {name, email, projectName, projectWebsite, notes} = req.body;

  let contextObject = {
    schemaAction: 'AskAction', //http://schema.org/
    emailSummary: 'Project discovery',
    name: name.split(' ')[0],
    projectName: projectName,
    projectWebsite: util.addHttp(projectWebsite),
    notes: notes
  };

  // send the estimate confirmation to the prospect
  let estimateConfirmation = {
    from: {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
    to: [{name:name, address:email}], // An array if you have multiple recipients.
    subject: 'Your project',
    template: {
      name: './admin/emails/templates/estimate.pug',
      engine: 'pug',
      context: contextObject
    }
  };
  sendMail(estimateConfirmation);

  // send the estimate request to myself
  let estimateRequest = {
    from: {name: name, address: email},
    to: [{name:'Julian Jorgensen', address:'me@julianjorgensen.com'}], // An array if you have multiple recipients.
    subject: projectName + ' estimate',
    template: {
      name: './admin/emails/templates/estimateRequest.pug',
      engine: 'pug',
      context: contextObject
    }
  };
  sendMail(estimateRequest);
  res.status(200).send('success');
}

module.exports.send = sendEstimateConfirmation;
