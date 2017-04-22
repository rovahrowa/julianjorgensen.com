let express = require('express');
let router = express.Router();
let togglSync = require('../admin/toggl/togglSync');

// Toggl and QuickBooks sync route
router.route('/sync-qbo/recent')
  .post(function (req, res) {
    togglSync.run().then(() => {
      res.status(200).send('Success!');
    }).catch((err) => {
      res.status(500).send('Error in syncing Toggl with QBO...');
    });
  });

module.exports = router;
