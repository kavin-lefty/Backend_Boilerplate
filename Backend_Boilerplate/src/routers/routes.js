const express = require("express");
const router = express.Router();
const makeController = require("../libs/core/helpers/controller");

const {
  UserCreationController,
  loginUserConntroller,
  getUserListController,
  updateSingleUserController,
  deleteOneUserController,
  getMovieCommentsController,
} = require("../controllers/user.controller");

router.route("/createUser").post(makeController(UserCreationController));

router.route("/login_user").post(makeController(loginUserConntroller));

router.route("/getUsers").post(makeController(getUserListController));

router.route("/updateUser").put(makeController(updateSingleUserController));

router.route("/deleteUser").post(makeController(deleteOneUserController));

router.route("/getComments").post(makeController(getMovieCommentsController));

module.exports = router;
