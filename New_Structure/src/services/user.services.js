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
    const { strName, strEmail, strPassword } = body;

    if (!strName || !strEmail || !strPassword) {
      throw new Error("Missing fields: name, email, or password");
    }

    const hashedPassword = await bcrypt.hash(strPassword, 12);

    const objInsertUser = await insertOneDB({
      objDocument: {
        strName,
        strEmail,
        strPassword: hashedPassword,
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
    const { strEmail, strPassword } = body;

    const objUser = await getOneDB({
      strCollection: "users",
      objQuery: {
        strEmail,
      },
    });

    const isMatch = await bcrypt.compare(strPassword, objUser.strPassword);

    if (!isMatch) {
      throw new errHandler("Invalid email or password");
    }

    const strToken = await jwtSignIn(
      {
        strUserId: objUser["_id"].toString(),
        strEmail: objUser["strEmail"],
        strName: objUser["strName"],
        chrStatus: objUser["chrStatus"],
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
        strUpdatedTime: new Date(source.timeReceived),
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
        strDeletedTime: new Date(source.timeReceived),
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
    const page = Math.max(parseInt(body.strPage, 10) || 1, 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const strCollection = "movies";

    // Basic condition
    let basicStatusCondition = {
      runtime: { $gte: 60 },
      year: { $gte: 2000 },
      "imdb.rating": { $eq: 6.8 },
    };
    let matchCondition = [basicStatusCondition];

    // Search filter
    if (body.strSearch) {
      const regexCondition = {
        $regex: body.strSearch.trim().replace(/\s+/g, ".*"),
        $options: "i",
      };
      matchCondition.push({
        $or: [{ title: regexCondition }],
      });
    }

    const finalMatch = { $and: matchCondition };

    // Count total documents
    const totalCount = await getCountDB({
      strCollection,
      objQuery: finalMatch,
    });

    // Aggregation pipeline
    let arrServiceQuery = [
      { $match: finalMatch },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "movie_id",
          as: "strComments",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const arrList = await getListDB({
      strCollection,
      arrQuery: arrServiceQuery,
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
    throw new errHandler(error.message).set();
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
