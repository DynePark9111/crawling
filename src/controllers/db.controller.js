const { getMongoDB } = require("../utils/functions");

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
  checkAllDB,
  checkDB,
};
