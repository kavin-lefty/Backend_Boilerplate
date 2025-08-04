const JWT = require("jsonwebtoken");
const { practice } = require("../models/models");

const genAuthToken = async (data) => {
  const { _id } = data;
  const token = JWT.sign({ id: _id }, "KK");
  return token;
};

const verifyAuthToken = async (req, res, next) => {
  let bearer = req.headers.authorization;
  let spliter = bearer.split(" ");
  let tempToken = spliter[1];
  //   console.log(tempToken );
  if (!tempToken) {
    res.status(401).send({ Message: "user logged" });
  }
  try {
    let payload = JWT.verify(tempToken, "KK");
    let userId = payload.id;
    let findUserById = await practice.findById(userId);
    console.log(findUserById);

    if (!findUserById) {
      res.status(401).send({ messege: "invalid user " });
    } else {
      req.userId = userId;
      next();
    }
  } catch (error) {     
    res.status(400).send({messege:"invalid token"})
  }
};

module.exports = { genAuthToken, verifyAuthToken };
