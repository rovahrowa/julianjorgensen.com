let CronJob = require('cron').CronJob;
let invoiceReminder = require('./invoiceReminder/init');
let syncTogglWithQuickbooks = require('../toggl/init');

// Initialize cron jobs
let invoiceReminderCron = new CronJob({
  cronTime: '00 00 10 * * 1-5',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 10:00:00 AM. It does not run on Saturday
     * or Sunday.
     */
     invoiceReminder.init();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});


// Sync Toggl with Quickbooks (runs every 15 minutes)
let syncTogglWithQuickbooksCron = new CronJob({
  cronTime: '00 */15 * * * *',
  onTick: function() {
    syncTogglWithQuickbooks.init();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});
