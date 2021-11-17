const https = require("https")
var moment = require("moment-timezone")
const helper = require("../helpers/helper")
const db = require("../models")
module.exports = {
  sendNotification: async function (type) {
    // Check people have birthday today
    const jobs = await db.Job.findAll({
      where: {
        status: 'pending'
      }
    })
    // Run each user
    jobs.forEach(async (job) => {
      const status_code = null
      const checker = await helper.timezoneChecker(job.location)
      const {send_is_true} = checker
      if (send_is_true) {
        // Execute send message
        const data = JSON.stringify({
          message: job.payload
        })

        const options = {
          hostname: "hookb.in",
          port: 443,
          path: "/wNMpOw07rksqJmrrJ7pa",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length
          }
        }

        const req = https.request(options, async (res) => {
          console.log(`status: ${res.statusCode}`)
          const list_job = await db.Job.findByPk(job.id)
          list_job.update({status:'sent'})
        });
      
        req.write(data);
        req.end();
      }
    });
  },
};
