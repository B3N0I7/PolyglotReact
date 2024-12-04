const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
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
    // type: String,
    // default: () => new Date().toLocaleDateString("fr-FR"),
  },
});

module.exports = wordSchema;
