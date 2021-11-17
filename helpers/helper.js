var moment = require("moment-timezone")
const db = require("../models")
module.exports = {
  processNotification: async function (location, point_date, payload, ref_id, type) {
    const check = await this.timezoneChecker(location, point_date)
    const {year_today, date_point_today, date_point_user, send_is_true} = check
    if (send_is_true) {
      // Find users whose birthday is today
      if (date_point_today === date_point_user) {
        
        // Init payload
        let queue = 1;
        
        let store_data = {
          ref_id:ref_id, 
          queue:queue, 
          payload:payload,
          attemps:0,
          status:'pending',
          location:location,
          year:year_today,
          type:type
        }

        // check data in queue in current year and ref id
        let fetch_job = await db.Job.findAll({
          where: {
            ref_id: ref_id,
            year:year_today,
            type:type
          }
        })

        if(fetch_job.length <= 0){
          // Store queue data
          const job = await db.Job.create(store_data)
          queue++
        }
      }
    }
  },
  timezoneChecker: async function (location, point_date) {
    // Set country timezone
    let timezone = moment.tz.zonesForCountry(location, true)

    // get one timezone
    let now = moment().tz(timezone[0].name)

    // Date for filtering birthday today
    let year_today = now.format('YYYY')
    let date_point_today = now.format('M-D')
    let date_point_user = moment(point_date).format('M-D')

    // Check start in 9:00 AM daily
    let hourToCheck = now.day() !== 0 ? 09 : 00
    let dateToCheck = now.hour(hourToCheck).minute(00)
    let send_is_true = moment().isAfter(dateToCheck)

    return {year_today, date_point_today, date_point_user, send_is_true}
  }
}