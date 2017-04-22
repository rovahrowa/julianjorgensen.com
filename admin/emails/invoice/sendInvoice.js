let sendMail = require('../sendMail');

let sendInvoice = function(mailOptions) {
  let promise = new Promise(function(resolve, reject){
    // Finally send the mail!
    sendMail(mailOptions).then((data) => {
      resolve(data);
    }).catch((err) => {
      console.log('Error: Something went wrong when sending the invoice email...', err);
    });

  });
  return promise;
};

module.exports = sendInvoice;
