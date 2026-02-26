const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.error(err.stack || err.message || err);
  res.status(status).json({
    message: "Something went wrong",
    error: err.message || "Internal server error"
  });
};


module.exports = errorHandler;
  
