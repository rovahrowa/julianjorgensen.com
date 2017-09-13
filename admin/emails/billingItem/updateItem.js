let moment = require('moment');
let util = require('../../../util/util');
let ENV_CONFIG = util.getEnvConfig();

let updateItem = ({
  itemRef,
  itemType
}) => {
  console.log('updating', itemType);
  if (itemRef && itemType) {
    console.log('the item was sent, now updating', itemRef);
    return new Promise((resolve, reject) => {
      let updatedItemData = {
        CustomField: [{
          "DefinitionId": "2",
          "Name": ENV_CONFIG.QBO_SENT_LABEL,
          "Type": "StringType",
          "StringValue": moment(Date.now()).format('DD-MM-YYYY')
        }],
        "EmailStatus": "EmailSent",
      };
      Object.assign(itemRef, updatedItemData);

      console.log('\n\n\nitemRef:', itemRef);

      if (itemType === 'estimate') {
        // update estimate
        qbo.updateEstimate(itemRef, (err, item) => {
          if (err) console.log('Error updating estimate: ', JSON.stringify(err));
          resolve();
        });
      } else {
        // update invoice
        qbo.updateInvoice(itemRef, (err, item) => {
          if (err) console.log('Error updating invoice: ', JSON.stringify(err));
          resolve();
        });
      }

    }).catch((err) => {
      console.log(err);
    });
  } else {
    return true;
  }
};

module.exports = updateItem;
