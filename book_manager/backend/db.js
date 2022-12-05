// db: postgresql
// db_name: bookmanager
// db_user: postgres
// db_password: postgres
// db_port: 54231

// connect to the database
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bookmanager',
    password: 'postgres',
    port: 54231,
});

module.exports = pool;
