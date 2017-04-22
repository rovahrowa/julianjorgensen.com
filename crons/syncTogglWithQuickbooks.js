let CronJob = require('cron').CronJob;

// Sync Toggl with Quickbooks (runs every 15 minutes)
let syncTogglWithQuickbooks = new CronJob({
  cronTime: '00 */15 * * * *',
  onTick: function() {
    console.log('run it!');
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});

module.exports = syncTogglWithQuickbooks;
