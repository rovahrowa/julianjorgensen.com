let getItem = require('./getItem');
let processItem = require('./processItem');
let sendItem = require('./sendItem');
let updateItem = require('./updateItem');

function init(id, itemType) {
  console.log(`Preparing to send ${itemType} invoice email for item id ${id}...`);
  return getItem(id, itemType)
    .then(processItem)
    .then(sendItem)
    .then(updateItem)
    .catch((err) => {
      throw Error(err);
    });
}

module.exports.send = init;
