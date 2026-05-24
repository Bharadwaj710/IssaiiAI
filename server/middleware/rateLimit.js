const attempts = new Map();

export const authRateLimit = (req, res, next) => {
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 25;
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const record = attempts.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }

  record.count += 1;
  attempts.set(key, record);

  if (record.count > maxRequests) {
    return res.status(429).json({ message: 'Too many authentication attempts. Please try again later.' });
  }

  return next();
};
