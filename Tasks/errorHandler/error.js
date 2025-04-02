const errorHandler = (fn) => {
  return async (req, res) => {
    try {
      await fn();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
};

module.exports = { errorHandler };
