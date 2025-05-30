const { ObjectId } = require('mongodb');

const validateId = (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format. Must be a valid MongoDB ObjectId.'
    });
  }

  next();
};

module.exports = validateId;
