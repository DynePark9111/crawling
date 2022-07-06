const { getMongoDB } = require("../utils/functions");
const { getUpdatedList } = require("../utils/naver");

const checkUpdates = async (req, res) => {
  try {
    const [webtoonsLength] = await getUpdatedList();
    res.status(201).json({ naver: webtoonsLength });
  } catch (error) {
    res.status(409).json({ message: `checkNaver error` });
  }
};

const checkNaver = async (req, res) => {
  try {
    const [webtoonsLength] = await getUpdatedList();
    res.status(201).json({ newWebtoons: webtoonsLength });
  } catch (error) {
    res.status(409).json({ message: `checkNaver error` });
  }
};

const checkDB = async (req, res) => {
  const { platform } = req.params;
  try {
    const dbData = await getMongoDB(platform);
    res.status(201).json({ length: dbData.length, data: dbData });
  } catch (error) {
    res.status(409).json({ message: `checkNaver error` });
  }
};

module.exports = {
  checkUpdates,
  checkNaver,
  checkDB,
};
