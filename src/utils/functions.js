const NewWebtoon = require("../models/newWebtoon.model");

function logTime(message) {
  const today = new Date();
  const time = `[${
    today.getMonth() + 1
  }/${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}]`;
  console.log(`${time} ${message}`);
}

// remove duplicated. by title
function getUniqueObjectFromArray(data) {
  return Array.from(
    data.reduce(
      (map, obj) => map.set(obj.title, map.has(obj.title) ? 0 : obj),
      new Map()
    ),
    ([key, value]) => value
  ).filter((x) => x);
}

async function postMongoDB(data) {
  try {
    await NewWebtoon.insertMany(data);
    console.log("upload successful!");
  } catch (err) {
    console.log("upload failed!");
    console.log(err);
  }
}

async function getMongoDB(platform) {
  if (platform === undefined) {
    return (dbData = 0);
  } else {
    return (dbData = await NewWebtoon.find({ platform: platform }));
  }
}

async function deleteMongoDB(platform) {
  const dbData = await NewWebtoon.deleteMany({ platform: platform });
  return dbData;
}

module.exports = {
  logTime,
  getUniqueObjectFromArray,
  postMongoDB,
  getMongoDB,
  deleteMongoDB,
};
