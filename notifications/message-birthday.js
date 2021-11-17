const helper = require("../helpers/helper")
const db = require("../models")
module.exports = {
  sendNotification: async function () {
    // Fetch all user
    const users = await db.User.findAll()
    // Run each user
    users.forEach(async (user) => {
      const type = 'birthday' //Type for differenciate event
      const user_id = user.id //user id
      const special_date = user.birth_day //moment date from table field
      const location  = user.location // location
      let full_name = user.first_name + " " + user.last_name
      const payload = `Hey, ${full_name} it's your birthday`
      // Timezone processor
      await helper.processNotification(location,special_date,payload,user_id,type)
    });
  },
};
