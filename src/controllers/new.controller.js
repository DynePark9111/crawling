const { getUpdatedList } = require("../utils/naver");
const { getUpdatedListKakao } = require("../utils/kakao");

const newAll = async (req, res) => {
  try {
    const [naver] = await getUpdatedList();
    const [kakao] = await getUpdatedListKakao();
    res.status(201).json({ naver, kakao });
  } catch (error) {
    res.status(409).json({ message: `newNaver error` });
  }
};

const newNaver = async (req, res) => {
  try {
    const [naver] = await getUpdatedList();
    res.status(201).json({ naver });
  } catch (error) {
    res.status(409).json({ message: `newNaver error` });
  }
};

const newKakao = async (req, res) => {
  try {
    const [kakao] = await getUpdatedListKakao();
    res.status(201).json({ kakao });
  } catch (error) {
    res.status(409).json({ message: `newKakao error` });
  }
};

module.exports = {
  newAll,
  newNaver,
  newKakao,
};
