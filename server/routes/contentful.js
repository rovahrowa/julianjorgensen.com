import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const clientPreview = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW,
  host: 'preview.contentful.com',
});

export const getProposal = (req, res) => {
  client.getEntry(req.params.id).then((entry) => {
    res.json(entry);
  }).catch((err) => {
    res.status(500).send(`Could not get proposal data from Contentful. Contact me@julianjorgensen.com if the error persists. ${err}`);
  });
};

export const getProposalPreview = (req, res) => {
  clientPreview.getEntry(req.params.id).then((entry) => {
    res.json(entry);
  }).catch((err) => {
    res.status(500).send(`Could not get proposal data from Contentful. Contact me@julianjorgensen.com if the error persists. ${err}`);
  });
};
