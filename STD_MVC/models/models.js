const mongoose = require("mongoose");
const { v4 } = require("uuid");

const practiceSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const practice = mongoose.model("practicedatas", practiceSchema);

module.exports = {
  practice,
};
