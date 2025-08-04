const practiceRouter = require("../routers/practice.routers");
const express = require("express");
const router = express.Router();

const application = [
  {
    path: "/practice",
    route: practiceRouter,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.route);
});

module.exports = router;
