import prepareContent from './utils/prepareContent';

export default passedData => new Promise((resolve, reject) => {
  const preparedMailContent = prepareContent(passedData);
  if (preparedMailContent) {
    resolve(preparedMailContent);
  }
});
