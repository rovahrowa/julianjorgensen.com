let express = require('express');
let router = express.Router();
let togglSync = require('../toggl/init');

let TogglClient = require('toggl-api');
const togglApiToken = process.env.TOGGL_API_TOKEN;
const toggl_workspace = process.env.TOGGL_WORKSPACE_ID;
toggl = new TogglClient({apiToken: togglApiToken });


// Toggl and QuickBooks sync route
router.route('/sync-qbo/recent')
  .post(function (req, res) {
    togglSync.init().then(() => {
      res.status(200).send('Success!');
    }).catch((err) => {
      res.status(500).send('Error in syncing Toggl with QBO...');
    });
  });

module.exports = router;
