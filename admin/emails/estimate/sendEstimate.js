let sendMail = require('../sendMail');

let sendEstimate = function(mailOptions) {
  let sendEstimatePromises = ['customer', 'admin'].map((recipientType) => {
    return new Promise(function(resolve, reject) {
      console.log(`sending estimate to ${recipientType} with mailOptions: ${mailOptions}`);
      if (recipientType == 'admin') {
        mailOptions.to = mailOptions.from;
      }

      console.log('estimateRef from sendEstimate.js', mailOptions.estimateRef);

      sendMail(mailOptions).then(() => {
        resolve(mailOptions.estimateRef); // pass the estimateRef to "markestimateSentDate" so we can track when the estimate was sent
      }).catch((err) => {
        console.log('Error: Something went wrong when sending the estimate email...', err);
      });
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });

  return Promise.all(sendEstimatePromises).catch((err) => {
    console.log(err);
  });
};

module.exports = sendEstimate;
