const practiceservice = require("../services/practice.service");

const { genAuthToken } = require("../middlewares/JWT.config");

const creation = async (req, res) => {
  const creation = await practiceservice.creation(req);

  if (creation == null) {
    res.status(400).send({ messege: "not found" });
  } else {
    res.status(201).send(creation);
  }
};

const fetchController = async (req, res) => {
  const fetch = await practiceservice.getMethod(req);

  if (fetch == null) {
    res.status(400).send({ messege: "no data found" });
  } else {
    res.status(201).send(fetch);
  }
};

const getByIdController = async (req, res) => {
  const fetchById = await practiceservice.getById(req);

  if (fetchById == null) {
    res.status(400).send({ messege: "no data found" });
  } else {
    res.status(201).send(fetchById);
  }
};

const updateController = async (req, res) => {
  const update = await practiceservice.update(req);

  if (!update) {
    res.status(401).send({ messege: "cant update" });
  } else {
    res.status(201).send(update);
  }
};

const deleteController = async (req, res) => {
  let deleting = await practiceservice.deleteMethod(req);

  if (deleting == null) {
    res.status(400).send({ messege: "user not found" });
  } else {
    res.status(201).send({ messege: "delete successfull" });
  }
};

const UserRegistration = async (req, res) => {
  try {
    const userReg = await practiceservice.Registration(req);
    res.status(201).send(userReg);
  } catch (error) {
    res.status(400).send({ messege: "Registration Failed" });
  }       
};

const loginController = async (req, res) => {
  try {
    const datas = await practiceservice.Login(req);
    if (datas != null) {
      let tokens = await genAuthToken(datas);
      // res.status(200).send(datas); // this is a response for login without JWT tokens 
      res.status(200).send({ data: datas, token: tokens });
    } else {
      res.status(401).send({ messege: "Credential Invalid" });
    }
  } catch (error) {
    res.status(401).send({ messege: "login Invalid" });
  }
};

const getUserProfileController = async (req, res) => {
  const data = await practiceservice.getProfile(req);
  try {
    res.send(data);
  } catch (error) {
    res.status(400).send({ messege: "user not available" });
  }
};

module.exports = {
  creation,
  fetchController,
  updateController,
  deleteController,
  getByIdController,
  UserRegistration, 
  loginController,
  getUserProfileController,
};
