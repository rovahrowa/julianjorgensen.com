import moment from 'moment';
import qbo from '../utils/qbo';

const keySecret = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(keySecret);

const charge = (req, res) => {
  const {
    stripeToken, invoiceId, invoiceNumber, amount, currency,
  } = req.body;

  // charge the customer with stripe
  stripe.charges.create({
    amount: Math.round(amount * 100), // times 100 to get it in dollars
    currency,
    description: `Flo Digital Inc. (Julian Jorgensen) invoice #${invoiceNumber}`,
    source: stripeToken,
  }, (error, chargeResponse) => {
    if (!error) {
      // update the invoice after charge
      qbo.getInvoice(invoiceId, (e, invoice) => {
        qbo.updateInvoice({
          Id: invoiceId,
          SyncToken: invoice.SyncToken,
          CustomField: [{
            DefinitionId: '1',
            Name: 'paid date',
            Type: 'StringType',
            StringValue: moment(Date.now()).format('DD-MM-YYYY'),
          }],
        }, (err, updatedInvoice) => {
          res.sendStatus(200);
        });
      });
    } else {
      res.status(200).send({ error: error.message });
    }
  });
};

export default charge;
