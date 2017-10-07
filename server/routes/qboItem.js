let express = require('express');
let router = express.Router();
let app = require('../app');

let util = require('../utils/utils');
let ENV_CONFIG = util.getEnvConfig();

let {
  processItemData
} = require('../utils/qbo');

// Get Invoice/Estimate route for Quickbooks
router.route('/:type/:id')
  .get(function(req, res) {
    // generate unique md5 token
    let secretVariable = 'Item' + req.params.id;
    let token = util.createToken(secretVariable);

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
            res.status(500).send('Error', err);
          });
        });
      }

      if (req.params.type === 'estimate') {
        // get estimate
        // qbo.findEstimates({}, (error, items) => {
        //   console.log("estimates:", items);
        // });

        qbo.getEstimate(req.params.id, (error, item) => {
          console.log('got estimate', item);

          processItemData(item).then((response) => {
            res.status(200).json(response);
          }).catch((err) => {
            res.status(500).send(`Error123 ${err}`);
          });
        });
      }
    }
  });

module.exports = router;
