const errorHandler = (fn) => {
  return async (request, response) => {
    try {
      await fn();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  };
};

module.exports = { errorHandler };
