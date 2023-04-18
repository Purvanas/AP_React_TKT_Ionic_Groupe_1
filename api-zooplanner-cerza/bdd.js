const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bdd-zooplanner',
    port:'3306'
})

module.exports = connection