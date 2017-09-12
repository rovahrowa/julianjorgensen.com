let sendMail = require('../sendMail');

let sendItem = function(preparedMailContent) {
  console.log('sending prepared email item', preparedMailContent);

  let sendItemPromises = ['customer', 'admin'].map((recipientType) => {
    return new Promise(function(resolve, reject) {
      console.log(`sending item to ${recipientType} with preparedMailContent: ${preparedMailContent}`);
      if (recipientType == 'admin') {
        preparedMailContent.to = preparedMailContent.from;
      }

      console.log('itemRef from sendItem.js', preparedMailContent.itemRef);

      sendMail(preparedMailContent).then(() => {
        resolve(preparedMailContent.itemRef); // pass the itemRef so we can update the item as being sent
      }).catch((err) => {
        console.log('Error: Something went wrong when sending the item email...', err);
      });
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });

  return Promise.all(sendItemPromises).catch((err) => {
    console.log(err);
  });
};

module.exports = sendItem;
