import qbo from './index';
import { isValidPayload } from '../../utils/utils';
import { mailItem } from '../../utils/qbo';

export default (req, res) => {
  // get data from QBO webhook
  const payload = req.body;
  const signature = req.get('intuit-signature');
  const token = process.env.QBO_WEBHOOK_TOKEN;

  // validate signature
  if (!isValidPayload(signature, token, payload)) {
    res.status(500).send('There was an error validating invoice token or payload.');
  }

  // loop over all event notifications emitted by QBO webhook
  payload.eventNotifications.map((events) => {
    // loop over all events
    events.dataChangeEvent.entities.map((event) => {
      // get event name (Invoice, or Estimate)
      const itemType = event.name.toLowerCase();

      // get event type (Create, Update, or Delete)
      const eventType = event.operation.toLowerCase();

      const itemId = event.id;

      // If its an invoice
      if (itemType === 'invoice') {
        qbo.getInvoice(itemId, (err, invoice) => {
          mailItem({
            item: invoice,
            itemType,
            eventType,
          }).then((response) => {
            console.log('sent');
            res.status(200).send(response);
          }).catch((error) => {
            res.status(500).send(error);
          });
        });
      }

      // If its an estimate
      if (itemType === 'estimate') {
        qbo.getEstimate(itemId, (err, estimate) => {
          mailItem({
            item: estimate,
            itemType,
            eventType,
          }).then((response) => {
            res.status(200).send(response);
          }).catch((error) => {
            res.status(500).send(error);
          });
        });
      }
    });
  });
};
