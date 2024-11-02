const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
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
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});

module.exports = mongoose.model("word", wordSchema, "dictionary");
