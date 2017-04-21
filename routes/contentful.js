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
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: spaceId,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: accessToken
});


router.route('/:id')
  .get(function (req, res) {
    console.log('Getting proposal data from Contentful...');
    client.getEntry(req.params.id).then((entry) => {
      res.json(entry).end();
    }).catch((error)=> {
      res.status(500).send('Could not get proposal data from Contentful. Contact me@julianjorgensen.com if the error persists.', error).end();
    });
  });

module.exports = router;
