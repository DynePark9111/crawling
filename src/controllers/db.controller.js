const { getMongoDB, deleteMongoDB } = require("../utils/functions");

const getAllDB = async (req, res) => {
  try {
    const naver = await getMongoDB("naver");
    const kakao = await getMongoDB("kakao");
    res.status(201).json({ naver: naver.length, kakao: kakao.length });
  } catch (error) {
    res.status(409).json({ message: `getAllDB error` });
  }
};

const getDB = async (req, res) => {
  const { platform } = req.params;
  try {
    const dbData = await getMongoDB(platform);
    res.status(201).json({ [platform]: dbData.length });
  } catch (error) {
    res.status(409).json({ message: `platform:${platform} check error` });
  }
};

const deleteDB = async (req, res) => {
  const { platform } = req.params;
  try {
    deleteMongoDB(platform);
    res.status(201).json({ message: `deleted ${platform} webtoon from DB` });
  } catch (error) {
    res.status(409).json({ message: `deleteDB error` });
  }
};

const deleteAllDB = async (req, res) => {
  try {
    deleteMongoDB();
    res.status(201).json({ message: `deleted all webtoon from DB` });
  } catch (error) {
    res.status(409).json({ message: `deleteAllDB error` });
  }
};

module.exports = {
  getAllDB,
  getDB,
  deleteAllDB,
  deleteDB,
};
