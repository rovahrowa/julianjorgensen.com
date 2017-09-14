let util = require('../../../../util/util');
let numeral = require('numeral');
let moment = require('moment');

let prepareContent = ({
  itemType,
  item,
  customer
}) => {
  // Create token for email button
  let secretVariable = 'Item' + item.Id;
  let itemToken = util.createToken(secretVariable);

  console.log('preparingContent');
  console.log('itemToken', itemToken);
  console.log('item id', item.Id);

  // Create variables
  let itemNumber = item.DocNumber;
  let itemAmount = numeral(item.Balance).format('$0,0.00');
  let currency = item.CurrencyRef.value;
  let itemDueDate = item.DueDate;
  let itemDueDateFormatted = moment(item.DueDate, 'YYYY-MM-DD').format('mmmm dS, yyyy');
  let customerIsActive = customer.Active;
  let customerName = customer.GivenName;
  let companyName = customer.CompanyName;

  // if item has an email then use that, otherwise use the email(s) associated with the customer
  let email;
  let emailCc;
  if (item.BillEmail) {
    email = item.BillEmail.Address;
  } else if (customer.PrimaryEmailAddr) {
    email = customer.PrimaryEmailAddr.Address;
  } else {
    email = null;
  }
  if (item.BillEmailCc) {
    emailCc = item.BillEmailCc.Address;
  } else {
    emailCc = null;
  }

  // if customer is active and has an email (or the item has an email specified)
  if (!customerIsActive || !email) {
    return false;
  }

  // create emailContext for .pug mail templates
  let emailContext = {
    itemId: item.Id,
    itemToken,
    itemNumber,
    itemAmount,
    itemDueDateFormatted,
    currency,
    customerName,
    companyName
  };

  console.log('emailContext', emailContext);

  // determine template and other itemType specific variables
  switch (itemType) {
    case 'estimate':
      subject = `Estimate`;
      itemTemplate = 'estimate.pug';
      emailContext.expirationDate = moment(item.ExpirationDate, 'YYYY-MM-DD').fromNow();
      console.log('expiration date: ', item.ExpirationDate);
      emailContext.expirationDateFormatted = moment(item.ExpirationDate, 'YYYY-MM-DD').format('mmmm dS, yyyy');
      console.log('expiration date formatted: ', emailContext.expirationDateFormatted);
      console.log('expiration date formatted2: ', moment(item.ExpirationDate, 'YYYY-MM-DD').format('DD-MM-YYYY'));
      break;
    case 'reminder':
      subject = `Invoice reminder`;
      itemTemplate = 'invoiceReminder.pug';
      emailContext.timeTillDueDate = moment(itemDueDate, 'YYYY-MM-DD').fromNow();
      break;
    case 'overdue':
      subject = `Invoice overdue!`;
      itemTemplate = 'invoiceOverdue.pug';
      emailContext.timeOverdue = moment(itemDueDate, 'YYYY-MM-DD').fromNow();
      break;
    case 'create':
      subject = 'Invoice #' + itemNumber;
      itemTemplate = 'invoice.pug';
      break;
    case 'update':
      subject = `Invoice #${itemNumber} updated`;
      itemTemplate = 'invoiceUpdated.pug';
  }

  console.log('itemTemplate', itemTemplate);

  // prepare final content
  let preparedMailContent = {
    from: {
      name: 'Julian Jorgensen',
      address: 'me@julianjorgensen.com'
    },
    to: [{
      name: customerName,
      address: email
    }], // An array if you have multiple recipients.
    subject,
    itemType,
    itemRef: {
      Id: item.Id,
      SyncToken: item.SyncToken,
      sparse: true,
      Line: item.Line,
      TxnTaxDetail: item.TxnTaxDetail
    },
    template: {
      name: `./admin/emails/templates/${itemTemplate}`,
      engine: 'pug',
      context: emailContext
    }
  };

  console.log('preparedMailContent', preparedMailContent);

  // if CC exists, then also include that to the object
  if (emailCc) {
    Object.assign({
      cc: emailCc
    }, preparedMailContent);
  }

  return preparedMailContent;
};
module.exports = prepareContent;
