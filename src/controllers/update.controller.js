const { logTime } = require("../utils/functions");
const { checkAndUpdateKakao } = require("../utils/kakao");
const { checkAndUpdateNaver } = require("../utils/naver");

const UpdateAll = async (req, res) => {
  logTime("UpdateAll");
  try {
    const [naverUpdated, kakaoUpdated] = await Promise.all([
      checkAndUpdateNaver(),
      checkAndUpdateKakao(),
    ]);
    res.status(201).json({ naverUpdated, kakaoUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateAll error` });
  }
};

const UpdateNaver = async (req, res) => {
  logTime("UpdateNaver");
  try {
    const naverUpdated = await checkAndUpdateNaver();
    res.status(201).json({ naverUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateNaver error` });
  }
};

const UpdateKakao = async (req, res) => {
  logTime("UpdateKakao");
  try {
    const kakaoUpdated = await checkAndUpdateKakao();
    res.status(201).json({ kakaoUpdated });
  } catch (error) {
    res.status(409).json({ message: `updateKakao error` });
  }
};

module.exports = {
  UpdateAll,
  UpdateNaver,
  UpdateKakao,
};
