const practicecontroller = require("../controllers/practice.controller");

const express = require("express");
const { verifyAuthToken } = require("../middlewares/JWT.config");
const router = express.Router();

router.route("/create").post(practicecontroller.creation);
router.route("/get").get(practicecontroller.fetchController);
router.route("/get/:id").get(practicecontroller.getByIdController);
router.route("/update/:id").put(practicecontroller.updateController);
router.route("/delete/:id").delete(practicecontroller.deleteController);
router.route("/registration").post(practicecontroller.UserRegistration);
router.route("/login").post(practicecontroller.loginController);
router
  .route("/profile")
  .get(verifyAuthToken, practicecontroller.getUserProfileController);

module.exports = router;
