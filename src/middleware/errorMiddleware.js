const errorMiddleware = (err, req, res, next) => {
  res.json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
