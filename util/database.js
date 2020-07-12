const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'node-shopping-app',
    password:'admin'
});

module.exports = pool.promise();