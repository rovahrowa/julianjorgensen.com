import Mailer from '../emails/Mailer';

export default (req, res) => {
  const {
    template, subject, ...context
  } = req.body;

  const mailOptions = {
    from: {
      name: 'Julian Jorgensen', address: 'me@julianjorgensen.com',
    },
    to: {
      name: 'Julian Jorgensen', address: 'me@julianjorgensen.com',
    },
    subject,
    template: {
      name: `./server/emails/templates/${template}.pug`,
      engine: 'pug',
      context: {
        ...context,
      },
    },
  };

  return new Promise((resolve, reject) => {
    Mailer(mailOptions).then(() => {
      resolve();
      res.status(200).send('success');
    }).catch((err) => {
      console.error('Error sending email ', err);
    });
  });
};
