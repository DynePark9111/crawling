const { logTime } = require("../utils/functions");
const { checkAndUpdateKakao } = require("../utils/kakao");
const { checkAndUpdateNaver } = require("../utils/naver");

const forceUpdateAll = async (req, res) => {
  const result = { message: "updateAll" };
  try {
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: `updateAll error` });
  }
};

const forceUpdateNaver = async (req, res) => {
  logTime("forceUpdateNaver");
  try {
    const webtoonsUpdated = await checkAndUpdateNaver();
    res.status(201).json({ webtoonsUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateNaver error` });
  }
};

const forceUpdateKakao = async (req, res) => {
  logTime("forceUpdateKakao");
  try {
    const webtoonsUpdated = await checkAndUpdateKakao();
    res.status(201).json({ webtoonsUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateKakao error` });
  }
};

module.exports = {
  forceUpdateAll,
  forceUpdateNaver,
  forceUpdateKakao,
};
