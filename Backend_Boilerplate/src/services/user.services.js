const { mernModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  getListDB,
  insertOneDB,
  updateOneKeyDB,
  getOneDB,
  getCountDB,
} = require("../libs/common/functions/DB");
const { errHandler, GetMongoDbConnection } = require("../libs/core/helpers");
const { ObjectId } = require("mongodb");
const { jwtSignIn, encryptString } = require("../libs/core/helpers");

const createUserService = async ({ source, body }) => {
  try {
    const { name, email, password } = body;

    if (!name || !email || !password) {
      throw new Error("Missing fields: name, email, or password");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const objInsertUser = await insertOneDB({
      objDocument: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      strCollection: "users",
    });

    return {
      strMessage: "User added successfully",
    };
  } catch (error) {
    throw new errHandler(error.message);
  }
};

const loginUserServices = async ({ source, body }) => {
  try {
    const { email, password } = body;

    const objUser = await getOneDB({
      strCollection: "users",
      objQuery: {
        email,
      },
    });

    const isMatch = await bcrypt.compare(password, objUser.password);

    if (!isMatch) {
      throw new errHandler("Invalid email or password");
    }

    const strToken = await jwtSignIn(
      {
        strUserId: objUser["_id"].toString(),
        strEmail: objUser["email"],
        strName: objUser["name"],
      },
      {
        issuer: "issuer",
        subject: "IP",
        audience: "USERS",
      }
    );

    const strEncryptedToken = await encryptString(strToken);

    return {
      strToken: strEncryptedToken,
      objUser,
    };
  } catch (error) {
    throw new errHandler(error.message);
  }
};

const getUserListService = async ({ source, body }) => {
  try {
    const strCollection = "users";

    const page = parseInt(body.strPage) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const arrQuery = [];
    const matchStage = {};

    if (body?.strSearch) {
      const searchRegex = {
        $regex: body.strSearch.trim().replace(/\s+/g, ".*"),
        $options: "i",
      };

      matchStage.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    if (Object.keys(matchStage).length) {
      arrQuery.push({ $match: matchStage });
    }

    arrQuery.push({ $sort: { year: -1 } }, { $skip: skip }, { $limit: limit });

    const arrList = await getListDB({ strCollection, arrQuery });

    const totalCount = await getCountDB({
      strCollection,
      objQuery: matchStage,
    });

    return {
      arrList,
      pagination: {
        pageSize: limit,
        current: page,
        total: totalCount,
      },
    };
  } catch (error) {
    console.error("getUserListService error:", error);
    throw error;
  }
};

const updateSingleUserService = async ({ source, body }) => {
  try {
    let objDocument = {};

    let { name, email, password } = body;

    if (name) objDocument.name = name;
    if (email) objDocument.email = email;
    if (password) objDocument.password = password;

    await updateOneKeyDB({
      _id: new ObjectId(body.strUserId),
      objDocument: {
        strUpdatedBy: new ObjectId(body.strUserId),
        strUpdatedTime: new Date(source.timReceived),
        ...objDocument,
      },
      strCollection: "users",
    });

    return {
      strMessage: "UPdates success",
    };
  } catch (error) {
    throw new errHandler(error.message);
  }
};

const deleteOneUserService = async ({ source, body }) => {
  try {
    let objDocument = {};
    objDocument.chrStatus = "D";

    await updateOneKeyDB({
      _id: new ObjectId(body.strUserId),
      objDocument: {
        strDeletedBy: new ObjectId(body.strUserId),
        strDeletedTime: new Date(source.timReceived),
        ...objDocument,
      },
      strCollection: "cln_user",
    });

    return {
      strMessage: "Successfully Deleted",
    };
  } catch (error) {
    throw new errHandler(error.message);
  }
};

const getMovieCommentsServices = async ({ source, body }) => {
  try {
    let baseMatchConditions = { $and: [] };
    let objQuery = {};

    const strCollection = "comments";

    const page = parseInt(body.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const arrQuery = [
      { $sort: { year: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    const arrList = await getListDB({ strCollection, arrQuery });

    const totalCount = await getCountDB({ strCollection, objQuery });
    // const objConnection = await GetMongoDbConnection();
    // const totalCount = await objConnection
    //   .collection(strCollection)
    //   .countDocuments();

    return {
      arrList,
      pagination: {
        pageSize: limit,
        current: page,
        total: totalCount,
      },
    };
  } catch (error) {
    throw new errHandler(error.message);
  }
};

const getAllMoviesListServices = async ({ source, body }) => {
  try {
    const page = Math.max(parseInt(body?.strPage, 10) || 1, 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const strCollection = "movies";

    let objQuery = {};

    let baseMatchConditions = [];
    let searchMatchConditions = [];

    if (body.strSearch) {
      searchMatchConditions.push({
        title: {
          $regex: body.strSearch.trim().replace(/\s+/g, ".*"),
          $options: "i",
        },
      });
    }

    const allMatchConditions = [
      ...baseMatchConditions,
      ...searchMatchConditions,
    ];

    const arrServiceQuery = [];

    // Only push $match if there are any conditions
    if (allMatchConditions.length > 0) {
      arrServiceQuery.push({ $match: { $and: allMatchConditions } });
    }

    arrServiceQuery.push(
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "movie_id",
          as: "comments",
        },
      },
      { $skip: skip },
      { $limit: limit }
    );

    const arrList = await getListDB({
      strCollection,
      arrQuery: arrServiceQuery,
    });

    const totalCount = await getCountDB({ strCollection, objQuery });

    return {
      arrList,
      pagination: {
        pageSize: limit,
        current: page,
        total: totalCount,
      },
    };
  } catch (error) {
    throw new errHandler(error.message);
  }
};

module.exports = {
  createUserService,
  loginUserServices,
  getUserListService,
  updateSingleUserService,
  deleteOneUserService,
  getMovieCommentsServices,
  getAllMoviesListServices,
};
