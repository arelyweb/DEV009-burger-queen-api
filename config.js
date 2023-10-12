/* eslint-disable linebreak-style */
exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = process.env.MONGO_URL || process.env.DB_URL || 'mongodb+srv://arely:HMundo01@cluster0.lun54gp.mongodb.net/bq-db';
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen-argon';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost.com';
exports.adminPassword = process.env.ADMIN_PASSWORD || '8520ar';
