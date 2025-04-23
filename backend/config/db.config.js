// Import the mysql2 module Promise Wrapper
const mysql = require("mysql2/promise");
// Prepare connection parameters we use to connect to the database
const dbConfig = {
   host: process.env.MYSQL_ADDON_HOST,
   user: process.env.MYSQL_ADDON_USER,
   password: process.env.MYSQL_ADDON_PASSWORD,
   database: process.env.MYSQL_ADDON_DB,
   connectionLimit: 10,
};
// Create the connection pool
const pool = mysql.createPool(dbConfig);
// Prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
   const [rows, fields] = await pool.execute(sql, params);
   return rows;
}
// Export the query function for use in the application
module.exports = { query };
