import Mailer from '../../../emails/Mailer';

export default (preparedMailData) => {
  const sendItemPromises = ['customer', 'admin'].map(recipientType => new Promise((resolve, reject) => {
    let preparedMail;
    if (recipientType === 'admin') {
      preparedMail = {
        ...preparedMailData,
        to: preparedMailData.from,
      };
    } else {
      preparedMail = preparedMailData;
    }

    Mailer(preparedMail).then(() => {
      resolve('sent billingItem email to ', recipientType); // pass the data so we can update item
    }).catch((err) => {
      console.log('Error: Something went wrong when sending the item email...', err);
    });
  }).catch((err) => {
    console.log('Error: ', err);
  }));

  return new Promise((resolve, reject) => Promise.all(sendItemPromises).then(() => {
    resolve(preparedMailData);
  }).catch((err) => {
    console.log(err);
  }));
};
