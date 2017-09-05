let express = require('express');
let router = express.Router();
let togglSync = require('../admin/toggl/init');

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

// Get toggl report
router.route('/get-report')
  .get(function (req, res) {
    let options = {
      workspace_id: toggl_workspace,
      // since:2013-05-19,
      // until:2013-05-20
    }
    toggl.summaryReport(options, (err, data) => {
      res.status(200).send(data);
    });
  });

module.exports = router;
