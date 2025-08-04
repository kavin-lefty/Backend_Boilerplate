const mongoose = require("mongoose");

const { v4 } = require("uuid");

const mernSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      // required: true,
    },
    phone: {
      type: Number,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
  },
  { timeStamps: true }
);

const mernModel = mongoose.model("UserData", mernSchema);

module.exports = {
  mernModel,
};
