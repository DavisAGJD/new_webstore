const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER || "sqlserver",
  password: process.env.DB_PASSWORD || "tienda1-2.",
  server: process.env.DB_SERVER || "34.31.209.81", 
  database: process.env.DB_DATABASE || "webstore", 
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
