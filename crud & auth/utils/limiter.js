const { MINUTE } = require("express-rate-limit");
const { default: rateLimit } = require("express-rate-limit");

const logLimiter = rateLimit({
  windowMs: 1 * MINUTE,
  limit: 3,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: "Block for 1 minute",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

module.exports = { logLimiter };
