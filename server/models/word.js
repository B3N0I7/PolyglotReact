const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  english: {
    type: String,
    required: true,
  },
  french: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  difficulty: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = wordSchema;
