let sendMail = require('../sendMail');

let sendInvoice = function (mailOptions) {
  let sendInvoicePromises = ['customer', 'admin'].map((recipientType) => {
    return new Promise(function (resolve, reject) {
      console.log(`sending invoice to ${recipientType} with mailOptions: ${mailOptions}`);
      if (recipientType == 'admin') {
        mailOptions.to = mailOptions.from;
      }

      sendMail(mailOptions).then(() => {
        resolve(mailOptions.invoiceRef); // pass the invoiceRef to "markinvoiceSentDate" so we can track when the invoice was sent
      }).catch((err) => {
        console.log('Error: Something went wrong when sending the invoice email...', err);
      });
    }).catch((err) => {
      console.log('Error: ', err);
    });
  });


  return new Promise(function (resolve, reject) {
    Promise.all(sendInvoicePromises).then(() => {
      resolve(mailOptions.invoiceRef);
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = sendInvoice;
