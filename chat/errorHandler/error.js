const errorHandler = (fn) => {
  return async (request, response) => {
    try {
      await fn();
    } catch (error) {
      console.log(error.status);
      return response.status(400).json({ message: error.message });
    }
  };
};

module.exports = { errorHandler };
