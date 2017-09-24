let moment = require('moment');
let util = require('../../utils/utils');
let ENV_CONFIG = util.getEnvConfig();

let updateItem = (passedData) => {
  console.log('passedData', passedData);
  let {
    itemType,
    itemRef
  } = passedData;
  console.log('updating itemType', itemType);
  console.log('updating itemRef', itemRef);
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
      } else if (itemType === 'invoice') {
        // update invoice
        qbo.updateInvoice(itemRef, (err, item) => {
          if (err) console.log('Error updating invoice: ', JSON.stringify(err));
          resolve();
        });
      }else{
        reject();
      }

    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  } else {
    return true;
  }
};

module.exports = updateItem;
