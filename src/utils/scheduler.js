const schedule = require("node-schedule");
const { checkAndUpdateNaver } = require("./naver");
const { logTime } = require("./functions");

schedule.scheduleJob("*/10 23,0 * * *", async () => {
  logTime("scheduledJob: Naver");
  checkAndUpdateNaver();
});

// schedule.scheduleJob("*/10 * * * * *", async () => {
//   logTime("current time");
// });
