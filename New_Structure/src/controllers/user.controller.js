const errHandler = require("../libs/core/helpers/errHandler");
const {
  createUserService,
  loginUserServices,
  getUserListService,
  updateSingleUserService,
  deleteOneUserService,
  getMovieCommentsServices,
  getAllMoviesListServices
} = require("../services/user.services");

const UserCreationController = async ({ body, ...source }) => {
  try {
    return {
      body: await createUserService({
        source,
        body,
      }),
    };
  } catch (error) {
    throw new errHandler(error.message).set();
  }
};

const loginUserConntroller = async ({ body, ...source }) => {
  try {
    return {
      body: await loginUserServices({
        source,
        body,
      }),
    };
  } catch (error) {
    throw new errHandler(error.message).set();
  }
};

const getUserListController = async ({ body, ...source }) => {
  try {
    return {
      body: await getUserListService({
        source,
        body,
      }),
    };
  } catch (error) {
    console.error(error, "error");
    throw new errHandler(error.message).set();
  }
};

const updateSingleUserController = async ({ body, ...source }) => {
  try {
    return {
      body: await updateSingleUserService({
        source,
        body,
      }),
    };
  } catch (error) {
    throw new errHandler(error.message).set();
  }
};

const deleteOneUserController = async ({ body, ...source }) => {
  try {
    return {
      body: await deleteOneUserService({
        source,
        body,
      }),
    };
  } catch (error) {
    throw new errHandler(error.message).set();
  }
};

const getMovieCommentsController = async ({ body, ...source }) => {
  try {
    return {
      body: await getMovieCommentsServices({
        source,
        body,
      }),
    };
  } catch (error) {
    throw new errHandler(error.message).set();
  }
};

const getAllMoviesListController = async ({ body, ...source }) => {
  try {
    return {
      body: await getAllMoviesListServices({
        source,
        body,
      }),
    };
  } catch (error) {
    throw new errHandler(error.message).set();
  }
};

module.exports = {
  UserCreationController,
  loginUserConntroller,
  getUserListController,
  updateSingleUserController,
  deleteOneUserController,
  getMovieCommentsController,
  getAllMoviesListController,
};
