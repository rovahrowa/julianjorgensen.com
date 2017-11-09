import Mailer from '../emails/Mailer';

export default (req, res) => {
  const {
    template, subject, name, email, ...context
  } = req.body;

  let { to, from } = req.body;

  const adminContact = {
    name: 'Julian Jorgensen', address: 'me@julianjorgensen.com',
  };

  if (from === 'user') from = { name, address: email };
  if (from === 'admin') from = adminContact;

  if (to === 'user') to = { name, address: email };
  if (to === 'admin') to = adminContact;

  const mailOptions = {
    from: from || adminContact,
    to: to || adminContact,
    subject,
    template: {
      name: `./server/emails/templates/${template}.pug`,
      engine: 'pug',
      context: {
        name,
        email,
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
