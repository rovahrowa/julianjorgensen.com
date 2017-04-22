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

function run(){
  console.log('Fetching data from Toggl...');
  return getTogglWorkspaceData(toggl_workspace)
    .then(getTogglTimeEntries)
    .then(getTogglWorkspaceClients)
    .then(syncClients)
    .then(getTogglWorkspaceProjects)
    .then(getTogglUsers)
    .then(processTimeEntries)
    .then(createQuickbooksTimeEntries)
    .then(markEntriesAsBilled);
}

module.exports.run = run;
