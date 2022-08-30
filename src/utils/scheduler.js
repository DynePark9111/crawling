const schedule = require("node-schedule");
const { checkAndUpdateNaver } = require("./naver");
const { logTime } = require("./functions");
const { checkAndUpdateKakao } = require("./kakao");

schedule.scheduleJob("*/10 23,0 * * *", async () => {
  logTime("scheduledJob: Naver");
  checkAndUpdateNaver();
});

schedule.scheduleJob("*/10 20,22 * * *", async () => {
  logTime("scheduledJob: Kakao");
  checkAndUpdateKakao();
});

// schedule.scheduleJob("*/10 * * * * *", async () => {
//   logTime("current time");
// });
