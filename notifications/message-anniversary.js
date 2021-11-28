const helper = require("../helpers/helper")
const db = require("../models")
module.exports = {
  sendNotification: async function () {
    // Fetch all user
    const users = await helper.batchData()
    // Run each user
    users.forEach(async (user) => {
      const type = 'anniversary' //Type for differenciate event
      const user_id = user.id //user id
      const special_date = user.anniversary //moment date from table field
      const location  = user.location // location
      let full_name = user.first_name + " " + user.last_name
      const payload = `Hey, ${full_name} it's your anniversary`
      // Timezone processor
      await helper.processNotification(location,special_date,payload,user_id,type)
    });
  },
};
