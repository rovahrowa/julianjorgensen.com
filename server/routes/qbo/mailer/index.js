import getItem from './getItem';
import processItem from './processItem';
import sendItem from './sendItem';
import updateItem from './updateItem';

export default (params) => {
  console.log(`Preparing to send ${params.eventType} ${params.itemType} email for item id ${params.id}...`);
  return getItem(params)
    .then(processItem)
    .then(sendItem)
    .then(updateItem);
};
