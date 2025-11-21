const logger = (req, res, next) => {
  const start = Date.now();
  const requestId = req.id || 'no-id';
  
  // Log da requisição
  console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.path} - IP: ${req.ip}`);
  
  // Interceptar o res.end para logar a resposta
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.path} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

module.exports = { logger };

