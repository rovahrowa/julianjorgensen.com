let express = require('express');
let router = express.Router();
let app = require('../app');
let crypto = require('crypto');
let bodyParser = require('body-parser');
let util = require('../util/util');
let numeral = require('numeral');
let dateFormat = require('dateformat');

let contentful = require('contentful')

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const accessTokenPreview = process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW;

const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken
});

const clientPreview = contentful.createClient({
  space: spaceId,
  accessToken: accessTokenPreview,
  host: 'preview.contentful.com'
});

router.route('/:id')
  .get(function (req, res) {
    client.getEntry(req.params.id).then((entry) => {
      res.json(entry);
    }).catch((err)=> {
      res.status(500).send(`Could not get proposal data from Contentful. Contact me@julianjorgensen.com if the error persists. ${err}`);
    });
  });

router.route('/:id/preview')
  .get(function (req, res) {
    clientPreview.getEntry(req.params.id).then((entry) => {
      res.json(entry);
    }).catch((err)=> {
      res.status(500).send(`Could not get proposal data from Contentful. Contact me@julianjorgensen.com if the error persists. ${err}`);
    });
  });

module.exports = router;
