let getDetails = require('./getDetails');
let processDetails = require('./processDetails');
let sendEstimate = require('./sendEstimate');
let updateEstimate = require('./updateEstimate');

function init(estimateId, estimateType) {
  console.log(`Preparing to send ${estimateType} estimate email for estimate id ${invoiceId}...`);
  return getDetails(estimateId, estimateType)
    .then(processDetails)
    .then(sendEstimate)
    .then(updateEstimate)
    .catch((err) => {
      throw Error(err);
    });
}

module.exports.send = init;
