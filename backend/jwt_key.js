const crypto = require('crypto');

const secretKey = crypto.randomBytes(64).toString('hex');  // 64 bytes
console.log(secretKey);
