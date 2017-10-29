import { CronJob } from 'cron';
import invoiceReminder from './invoiceReminder';

// Initialize cron jobs
const invoiceReminderCron = new CronJob({
  cronTime: '00 00 10 * * 1-5',
  onTick: () => {
    /*
     * Runs every weekday (Monday through Friday)
     * at 10:00:00 AM. It does not run on Saturday
     * or Sunday.
     */
    invoiceReminder();
  },
  start: true,
  timeZone: 'America/Los_Angeles',
});
invoiceReminderCron.start();
