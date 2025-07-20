const path = require("path");
const envFile =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "../../../../development.env")
    : process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../../../../production.env")
    : path.resolve(__dirname, "../../../../testing.env");

require("dotenv").config({ path: envFile });

const MONGODB_URL = process.env.DB_CONNECT_URL;
const STR_COMMON_DB_TENANT_ID = process.env.STR_COMMON_DB_TENANT_ID;
const STR_DB_NAME = "sample_mflix";

module.exports = { MONGODB_URL, STR_DB_NAME, STR_COMMON_DB_TENANT_ID };
