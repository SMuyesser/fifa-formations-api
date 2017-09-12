exports.CLIENT_ORIGIN = 'https://fifaformations.netlify.com';
exports.PORT = process.env.PORT || 8000;
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/fifaformationsdb';
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
