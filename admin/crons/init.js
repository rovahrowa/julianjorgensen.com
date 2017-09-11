let CronJob = require('cron').CronJob;
let invoiceReminder = require('./invoiceReminder/init');
let syncTogglWithQuickbooks = require('../toggl/init');

// Initialize cron jobs
let invoiceReminderCron = new CronJob({
  cronTime: '00 00 10 * * 1-5',
  onTick: function () {
    /*
     * Runs every weekday (Monday through Friday)
     * at 10:00:00 AM. It does not run on Saturday
     * or Sunday.
     */
    invoiceReminder.init()
      .then(() => {
        console.log('finished sending invoice reminders...');
      })
      .catch((err) => {
        console.log('invoice reminder error: ', err);
      });
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});

// Sync Toggl with Quickbooks (runs every 2 hours)
let syncTogglWithQuickbooksCron = new CronJob({
  cronTime: '00 00 */2 * * *',
  onTick: function () {
    syncTogglWithQuickbooks.init();
  },
  start: true
});
