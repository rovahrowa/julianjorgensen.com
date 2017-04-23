let express = require('express');
let router = express.Router();
let togglSync = require('../admin/toggl/init');

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
