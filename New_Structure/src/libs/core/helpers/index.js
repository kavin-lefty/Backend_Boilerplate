const makeController = require("./controller");
const { GetMongoDbConnection } = require("./DBConnection");
const errHandler = require("./errHandler");

const { jwtDecode, jwtSignIn, jwtVerify } = require("./jwtServices");
const {
  compareHashAndText,
  decryptString,
  encryptString,
  hashString,
} = require("./cryptoService");

module.exports = {
  makeController,
  GetMongoDbConnection,
  errHandler,
  jwtDecode,
  jwtSignIn,
  jwtVerify,
  compareHashAndText,
  decryptString,
  encryptString,
  hashString,
};
