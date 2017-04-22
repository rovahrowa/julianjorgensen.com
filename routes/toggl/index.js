let express = require('express');
let router = express.Router();
let app = require('../../app');
let util = require('../../util/util');
let crypto = require('crypto');
let merge = require('merge'), original, cloned;

let TogglClient = require('toggl-api');
const togglApiToken = process.env.TOGGL_API_TOKEN;
const toggl_workspace = process.env.TOGGL_WORKSPACE_ID;
toggl = new TogglClient({apiToken: togglApiToken });

let getTogglWorkspaceData = require('./getTogglWorkspaceData');
let getTogglTimeEntries = require('./getTogglTimeEntries');
let getTogglWorkspaceClients = require('./getTogglWorkspaceClients');
let syncClients = require('./syncClients');
let getTogglWorkspaceProjects = require('./getTogglWorkspaceProjects');
let getTogglUsers = require('./getTogglUsers');
let processTimeEntries = require('./processTimeEntries');
let createQuickbooksTimeEntries = require('./createQuickbooksTimeEntries');
let markEntriesAsBilled = require('./markEntriesAsBilled');

// Toggl and QuickBooks sync route
router.route('/sync-qbo/recent')
  .post(function (req, res) {
    console.log('Fetching data from Toggl...');

      getTogglWorkspaceData(toggl_workspace)
        .then(getTogglTimeEntries)
        .then(getTogglWorkspaceClients)
        .then(syncClients)
        .then(getTogglWorkspaceProjects)
        .then(getTogglUsers)
        .then(processTimeEntries)
        .then(createQuickbooksTimeEntries)
        .then(markEntriesAsBilled)
        .then(() => {
          res.status(200).send('Success!');
        }).catch((err) => {
          res.status(500).send('Error in syncing Toggl with QBO...');
        });
  });

module.exports = router;
