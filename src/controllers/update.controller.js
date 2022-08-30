const { logTime } = require("../utils/functions");
const { checkAndUpdateKakao } = require("../utils/kakao");
const { checkAndUpdateNaver } = require("../utils/naver");

const UpdateAll = async (req, res) => {
  logTime("UpdateAll");
  try {
    const webtoonsUpdatedNaver = await checkAndUpdateNaver();
    const webtoonsUpdatedKakao = await checkAndUpdateKakao();
    res.status(201).json({ webtoonsUpdatedNaver, webtoonsUpdatedKakao });
  } catch (error) {
    res.status(409).json({ message: `updateAll error` });
  }
};

const UpdateNaver = async (req, res) => {
  logTime("UpdateNaver");
  try {
    const webtoonsUpdated = await checkAndUpdateNaver();
    res.status(201).json({ webtoonsUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateNaver error` });
  }
};

const UpdateKakao = async (req, res) => {
  logTime("UpdateKakao");
  try {
    const webtoonsUpdated = await checkAndUpdateKakao();
    res.status(201).json({ webtoonsUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateKakao error` });
  }
};

module.exports = {
  UpdateAll,
  UpdateNaver,
  UpdateKakao,
};
