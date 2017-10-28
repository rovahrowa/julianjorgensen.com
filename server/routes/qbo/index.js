import QuickBooks from 'node-quickbooks';
import { envConfig } from '../../utils/utils';

// Quick Books
export default new QuickBooks(
  process.env.QBO_CONSUMER_KEY,
  process.env.QBO_CONSUMER_SECRET,
  process.env.QBO_OAUTH_TOKEN,
  process.env.QBO_OAUTH_TOKEN_SECRET,
  process.env.QBO_REALM_ID,
  envConfig.ENV === 'development',
  envConfig.ENV === 'development',
);

export itemDetails from './itemDetails';
export webhook from './webhook';
