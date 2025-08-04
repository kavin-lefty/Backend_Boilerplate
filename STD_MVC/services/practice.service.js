const { practice } = require("../models/models");
const Bcrypt = require("bcrypt");

const creation = async (req) => {
  let body = req.body;
  console.log(body);
  let creation = await practice.create(body);
  if (!creation) {
    return null;
  } else {
    return creation;
  }
};

const getMethod = async (req) => {
  //   let id = req.params.id;
  const fetch = await practice.find();

  if (!fetch) {
    return null;
  } else {
    return fetch;
  }
};

const getById = async (req) => {
  let id = req.params.id;
  const fetchById = await practice.findById(id);

  if (!fetchById) {
    return null;
  } else {
    return fetchById;
  }
};

const update = async (req) => {
  let id = req.params.id;
  let body = req.body;

  const updating = await practice.findById(id);

  if (!updating) {
    return null;
  } else {
    const updating = await practice.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    return updating;
  }
};

const deleteMethod = async (req) => {
  let id = req.params.id;
  //   let body = req.body;
  let deleting = await practice.findById(id);

  if (!deleting) {
    return null;
  } else {
    let deleting = await practice.findByIdAndDelete(id);
    return deleting;
  }
};

const Registration = async (req) => {
  let body = req.body;
  const { password } = body;
  const salt = await Bcrypt.genSalt(10);
  const hash = await Bcrypt.hash(password, salt);
  const data = { ...body, ...{ password: hash } };
  const register = await practice.create(data);
  return register;
};

const Login = async (req) => {
  let body = req.body;
  const { email, password } = body;
  let findByEmail = await practice.findOne({ email: email });
  if (!findByEmail) {
    return null;
  } else {
    let comp = await Bcrypt.compare(password, findByEmail.password);
    if (comp) {
      let ClientData = {
        name: findByEmail.name,
        email: findByEmail.email,
        phone: findByEmail.phone,
        active: findByEmail.active,
        _id: findByEmail._id,
      };
      return ClientData;
    } else {
      return null;
    }
  }
};

const getProfile = async (req) => {
  let userId = req.userId;
  let findUser = await practice.findById(userId);
  if (!findUser) {
    return null;
  } else {
    return findUser;
  }
};

module.exports = {
  creation,
  getMethod,
  update,
  deleteMethod,
  getById,
  Registration,
  Login,
  getProfile,
};
