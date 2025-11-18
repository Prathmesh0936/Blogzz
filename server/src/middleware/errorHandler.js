const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Resource not found',
    details: { url: req.originalUrl },
  });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    details: err.details || null,
  });
};

module.exports = { notFoundHandler, errorHandler };

