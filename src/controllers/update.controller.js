const { logTime } = require("../utils/functions");
const { checkAndUpdateKakao } = require("../utils/kakao");
const { checkAndUpdateNaver } = require("../utils/naver");

const UpdateAll = async (req, res) => {
  const result = { message: "updateAll" };
  try {
    res.status(201).json(result);
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
