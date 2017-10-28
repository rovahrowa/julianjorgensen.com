let prepareContent = require('./utils/prepareContent');

let processItem = function(passedData) {
  return new Promise(function(resolve, reject) {
    console.log('processing item..', passedData);
    let preparedMailContent = prepareContent(passedData);
    if (preparedMailContent) {
      resolve(preparedMailContent);
    }
  });
};

module.exports = processItem;
