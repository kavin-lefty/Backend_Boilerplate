const express = require("express");
const router = express.Router();
const userRoutes = require("../routers/routes");

const application = [
  {
    path: "/user",
    route: userRoutes,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.route);
});

module.exports = router;
