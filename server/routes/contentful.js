import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getLandingpage = (req, res) => {
  client.getEntries({
    'fields.url': req.params.id,
    'content_type': 'landingPage',
  }).then((entries) => {
    res.json(entries.items[0]);
  }).catch((err) => {
    res.status(500).send(`Could not get landingpage data from Contentful. ${err}`);
  });
};
