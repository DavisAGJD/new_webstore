const sql = require("mssql");

const dbConfig = {
  user: "Davistranger",
  password: "tienda1-2<>",
  server: "localhost",
  database: "webstore",
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    enableArithAbort: true,
    trustServerCertificate: true
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config: ", err);
    throw err;
  });
  

module.exports = {
  sql,
  poolPromise,
};