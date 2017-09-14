let getItem = require('./getItem');
let processItem = require('./processItem');
let sendItem = require('./sendItem');
let updateItem = require('./updateItem');

function init(params) {
  console.log(`Preparing to send ${params.eventType} ${params.itemType} email for item id ${params.id}...`);
  return getItem(params)
    .then(processItem)
    .then(sendItem)
    .then(updateItem);
}

module.exports.send = init;
