let sendEmail = require('../sendEmail');

let sendItem = function(preparedMailContent) {
  console.log('sending prepared email item', preparedMailContent);

  let sendItemPromises = ['customer', 'admin'].map((recipientType) => {
    return new Promise(function(resolve, reject) {
      console.log(`sending item to ${recipientType} with preparedMailContent: ${preparedMailContent}`);
      if (recipientType == 'admin') {
        preparedMailContent.to = preparedMailContent.from;
      }

      sendEmail(preparedMailContent).then(() => {
        resolve('sent billingItem email to ', recipientType); // pass the data so we can update item
      }).catch((err) => {
        console.log('Error: Something went wrong when sending the item email...', err);
      });
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });

  return new Promise((resolve, reject) => {
    return Promise.all(sendItemPromises).then(() => {
      resolve(preparedMailContent);
    }).catch((err) => {
      console.log(err);
    });
  });
};

module.exports = sendItem;
