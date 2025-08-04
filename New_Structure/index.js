const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routers = require("./src/routers");
const { jwtTokenChecking } = require("./src/libs/core/middleware");
let app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(jwtTokenChecking);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

let port = 8009;

app.use(Routers);

app.get("/health", (req, res) => {
  res.send("Server is Successfully running  😊😊😊😊😊 ");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
