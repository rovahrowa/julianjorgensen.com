let moment = require('moment');
let util = require('../../../util/util');
let ENV_CONFIG = util.getEnvConfig();

let updateItem = (passedData) => {
  let itemRef = passedData[0];
  if (!itemRef) return true;

  if (itemRef) {
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

      // update invoice
      qbo.updateInvoice(itemRef, (err, invoice) => {
        if (err) console.log('Error updating invoice: ', JSON.stringify(err));
        resolve(`Updated invoice`);
      });

    }).catch((err) => {
      console.log(err);
    });
  }
};

module.exports = updateItem;
