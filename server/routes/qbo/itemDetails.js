import { createToken } from '../../utils/utils';
import qbo from './index';
import { processItemData } from '../../utils/qbo';

export default (req, res) => {
  // generate unique md5 token
  const secretVariable = `Item${req.params.id}`;
  const token = createToken(secretVariable);

  // if token is false, then don't allow
  if (req.query.token !== token) {
    res.status(401).send({ message: 'You are unauthorized to see this item.' }).end();
  }

  if (req.query.token === token) {
    if (req.params.type === 'invoice') {
      // get invoice
      qbo.getInvoice(req.params.id, (error, item) => {
        processItemData(item).then((response) => {
          res.status(200).json(response);
        }).catch((err) => {
          res.status(500).send(`Error: ${err}`);
        });
      });
    }

    if (req.params.type === 'estimate') {
      // get estimate
      qbo.getEstimate(req.params.id, (error, item) => {
        processItemData(item).then((response) => {
          res.status(200).json(response);
        }).catch((err) => {
          res.status(500).send(`Error123 ${err}`);
        });
      });
    }
  }
};
