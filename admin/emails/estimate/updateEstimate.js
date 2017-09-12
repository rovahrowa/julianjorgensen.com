let moment = require('moment');
let util = require('../../../util/util');
let ENV_CONFIG = util.getEnvConfig();

let updateEstimate = (passedData) => {
  let estimateRef = passedData[0];
  if (!estimateRef) return true;

  if (estimateRef) {
    console.log('the estimate was sent, now updating', estimateRef);
    return new Promise((resolve, reject) => {
      let updatedEstimateData = {
        CustomField: [{
          "DefinitionId": "2",
          "Name": ENV_CONFIG.QBO_SENT_LABEL,
          "Type": "StringType",
          "StringValue": moment(Date.now()).format('DD-MM-YYYY')
        }],
        "EmailStatus": "EmailSent",
      };
      Object.assign(estimateRef, updatedEstimateData);

      console.log('\n\n\nestimateRef:', estimateRef);

      qbo.updateEstimate(estimateRef, (err, estimate) => {
        if (err) console.log('Error updating estimate: ', JSON.stringify(err));

        resolve(`Success updating estimate`);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
};

module.exports = updateEstimate;
