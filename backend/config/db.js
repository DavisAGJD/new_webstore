const sql = require("mssql");

const dbConfig = {
  user: "sqlserver",
  password: "tienda1-2.",
  server: "34.31.209.81",
  database: "webstore",
  options: {
    encrypt: true, 
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
