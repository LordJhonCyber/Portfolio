const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusEmoji = status < 400 ? '✅' : status < 500 ? '⚠️' : '❌';

    console.log(`${statusEmoji} ${req.method} ${req.path} - ${status} (${duration}ms)`);
  });

  next();
};

module.exports = logger;
