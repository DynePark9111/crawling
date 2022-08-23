const { deleteMongoDB } = require("../utils/functions");

const test = async (req, res) => {
  try {
    res.status(201).json({ message: "test" });
  } catch (error) {
    res.status(409).json({ message: `test error` });
  }
};

const reset = async (req, res) => {
  const { platform } = req.params;
  try {
    deleteMongoDB(platform);
    res.status(201).json({ message: "reset successful" });
  } catch (error) {
    res.status(409).json({ message: `reset error` });
  }
};

const resetAll = async (req, res) => {
  try {
    deleteMongoDB();
    res.status(201).json({ message: "reset successful" });
  } catch (error) {
    res.status(409).json({ message: `reset error` });
  }
};

module.exports = {
  test,
  reset,
  resetAll,
};
