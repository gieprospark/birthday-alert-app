
const cron = require('node-cron');
const process = require('../services/send-notification')

// Notification
const message_birthday = require('../notifications/message-birthday')
const message_anniversary = require('../notifications/message-anniversary')
module.exports = {
  runJob: function () {
    // Run every 1 Minute
    cron.schedule('*/60 * * * * *', () => {
      // generate queue data
      message_birthday.sendNotification()
      message_anniversary.sendNotification()

      // Send notification service
      process.sendNotification()
    });
  },
};