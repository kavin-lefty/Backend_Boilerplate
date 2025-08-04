const { MongoClient } = require("mongodb");
const { MONGODB_URL, STR_DB_NAME } = require("../../common/constants");
const errHandler = require("./errHandler");

let mongoConnection;

const CreateMongoConnection = async () => {
  try {
    mongoConnection = await MongoClient.connect(MONGODB_URL, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoClient Created");
  } catch (error) {
    console.log("error connecting the DB");
    throw new errHandler(error.message);
  }
};

const GetMongoDbConnection = async () => {
  try {
    if (!mongoConnection) await CreateMongoConnection();
    return mongoConnection.db(STR_DB_NAME);
  } catch (error) {
    throw new errHandler(error.message);
  }
};

module.exports = { GetMongoDbConnection };
