let util = require('../utils/utils');
let moment = require('moment');

let processTimeEntries = function(passedData) {
  let promise = new Promise(function(resolve, reject){
    let {timeEntries, workspace, clients, projects, users} = passedData;

    let processedTimeEntries = [];

    // loop over all time entries
    timeEntries.map((timeEntry) => {
      // detect if the entry was already billed (has the "billed" tag)
      let billed;
      if (timeEntry.tags){
        billed = (timeEntry.tags.indexOf("billed") > -1);
      }

      let today = moment().startOf('day');
      let timeEntryLogged = moment(timeEntry.stop, 'YYYY-MM-DD');
      let daysSinceTimeEntryLogged = Math.round(moment.duration(today - timeEntryLogged).asDays());

      // If there's a new time entry from Toggl, then add it to QuickBooks:
      // if it's a billable entry, has not been billed yet, is more than 30 seconds, and logged more than a day ago
      if (!timeEntry.billable || billed || timeEntry.duration < 30 || daysSinceTimeEntryLogged < 2){
        return false;
      }else{
        // description
        let description = timeEntry.description;

        // format times
        let hours = Math.floor(timeEntry.duration/60/60);
        let minutes = Math.round((timeEntry.duration/60) - (hours*60));

        // get user and project details for this timeentry
        let user = util.searchObjects(timeEntry.uid, 'uid', users);
        let project = util.searchObjects(timeEntry.pid, 'id', projects);

        // get client name
        let client = util.searchObjects(project.cid, 'id', clients);
        let clientName = client.name;
        let clientQboId = client.qboId;

        // determine currency
        let currency;
        if (project.currency){
          currency = project.currency;
        }else{
          currency = workspace.default_currency;
        }

        // determine rate
        if (project.rate){
          rate = project.rate;
        }else{
          rate = workspace.default_hourly_rate;
        }

        processedTimeEntries.push({
          id: timeEntry.id,
          clientQboId,
          clientName,
          date: timeEntry.start,
          rate,
          currency,
          hours,
          minutes,
          description
        });
      }
    });
    resolve(processedTimeEntries);
  });
  return promise;
}

module.exports = processTimeEntries;
