const { getMongoDB } = require("../utils/functions");
const { getUpdatedList } = require("../utils/naver");
const { getUpdatedListKakao } = require("../utils/kakao");

const checkAll = async (req, res) => {
  try {
    const [naver] = await getUpdatedList();
    const [kakao] = await getUpdatedListKakao();
    res.status(201).json({ naver, kakao });
  } catch (error) {
    res.status(409).json({ message: `checkNaver error` });
  }
};

const checkNaver = async (req, res) => {
  try {
    const [naver] = await getUpdatedList();
    res.status(201).json({ naver });
  } catch (error) {
    res.status(409).json({ message: `checkNaver error` });
  }
};

const checkKakao = async (req, res) => {
  try {
    const [kakao] = await getUpdatedListKakao();
    res.status(201).json({ kakao });
  } catch (error) {
    res.status(409).json({ message: `checkKakao error` });
  }
};

const checkAllDB = async (req, res) => {
  try {
    const naver = await getMongoDB("naver");
    const kakao = await getMongoDB("kakao");
    res.status(201).json({ naver: naver.length, kakao: kakao.length });
  } catch (error) {
    res.status(409).json({ message: `checkNaver error` });
  }
};

const checkDB = async (req, res) => {
  const { platform } = req.params;
  try {
    const dbData = await getMongoDB(platform);
    res.status(201).json({ [platform]: dbData.length });
  } catch (error) {
    res.status(409).json({ message: `platform:${platform} check error` });
  }
};

module.exports = {
  checkAll,
  checkNaver,
  checkKakao,
  checkAllDB,
  checkDB,
};
