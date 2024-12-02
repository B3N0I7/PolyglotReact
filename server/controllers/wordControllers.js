const mongoose = require("mongoose");
const wordSchema = require("../models/word");
// Get all pseudo words
exports.getAllWords = async (req, res) => {
  const { pseudo } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans getAllwords : ${collectionName}`);
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  try {
    const words = await PseudoWords.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create new word
exports.createWord = async (req, res) => {
  const { pseudo } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans create: ${collectionName}`);
  console.log("Body de le req", req.body);
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  const word = new PseudoWords({
    english: req.body.english,
    french: req.body.french,
    category: req.body.category,
    difficulty: req.body.difficulty,
    creationDate: req.body.creationDate,
  });

  try {
    const newWord = await word.save();
    res.status(200).json(newWord);
  } catch (error) {
    console.error("Error saving word :", error);
    res.status(400).json({ message: error.message });
  }
};
// Quiz
exports.getRandomEnglishWord = async (req, res) => {
  const { pseudo } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans getRandomEnglish : ${collectionName}`);
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  try {
    const word = await PseudoWords.aggregate([{ $sample: { size: 1 } }]);
    res.json({ english: word[0].english, id: word[0]._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRandomFrenchWord = async (req, res) => {
  const { pseudo } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans getRandomFrench : ${collectionName}`);
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  try {
    const word = await PseudoWords.aggregate([{ $sample: { size: 1 } }]);
    res.json({ french: word[0].french, id: word[0]._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyTranslation = async (req, res) => {
  const { pseudo } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans create: ${collectionName}`);
  console.log("Body de le req", req.body);
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  try {
    const { wordId, english, french } = req.body;
    const word = await PseudoWords.findById(wordId);

    if (!word) {
      return res.status(404).json({ message: "Word not found" });
    }

    const isCorrect =
      word.english.toLowerCase() === english.toLowerCase() &&
      word.french.toLowerCase() === french.toLowerCase();

    res.json({
      isCorrect,
      correctEnglish: word.english,
      correctFrench: word.french,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Check collection
exports.checkAndCreateCollection = async (req, res) => {
  const { pseudo } = req.body;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans check and create : ${collectionName}`);

  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === collectionName
    );

    if (!collectionExists) {
      await mongoose.connection.db.createCollection(collectionName);
      return res
        .status(201)
        .json({ message: `Collection ${collectionName} created successfully` });
    } else {
      return res
        .status(200)
        .json({ message: `Collection ${collectionName} already exists` });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
// Get all by category
exports.getWordsByCategory = async (req, res) => {
  const { pseudo, category } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  console.log(`Collection Name dans getWordsByCategory : ${collectionName}`);
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  try {
    const filter = category === "all" ? {} : { category: category };
    const words = await PseudoWords.find(filter);
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get filtered all
exports.getFilteredAllWords = async (req, res) => {
  const { pseudo, category, difficulty } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  const PseudoWords = mongoose.model(collectionName, wordSchema);

  try {
    let filteredList = {};
    if (category && category !== "all") {
      filteredList = { ...filteredList, category };
    }
    if (difficulty && difficulty !== "all") {
      filteredList = { ...filteredList, difficulty };
    }
    const words = await PseudoWords.find(filteredList);
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update word
exports.updateWord = async (req, res) => {
  const { pseudo, id } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  const PseudoWord = mongoose.model(collectionName, wordSchema);
  console.log(`Pseudo: ${pseudo}, Id: ${id}`);
  console.log(`Params: `, req.params);
  console.log(`Body: `, req.body);
  try {
    const updatedWord = await PseudoWord.findByIdAndUpdate(
      id,
      {
        english: req.body.english,
        french: req.body.french,
        category: req.body.category,
        difficulty: req.body.difficulty,
      },
      { new: true }
    );
    if (updatedWord) {
      res.json(updatedWord);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get word by id
exports.getWordById = async (req, res) => {
  const { pseudo, id } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  const PseudoWord = mongoose.model(collectionName, wordSchema);
  try {
    const word = await PseudoWord.findById(id);
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get word by english word
exports.getWordByEnglish = async (req, res) => {
  const { pseudo, englishWord } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  const PseudoWord = mongoose.model(collectionName, wordSchema);
  console.log(
    `By English, pseudo: ${pseudo}, englishWord: ${englishWord}, collectionName: ${collectionName}`
  );
  try {
    const word = await PseudoWord.findOne({ english: englishWord });
    if (word) {
      console.log(word._id);
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get word by french word
exports.getWordByFrench = async (req, res) => {
  const { pseudo, frenchWord } = req.params;
  const collectionName = `${pseudo}-dictionary`;
  const PseudoWord = mongoose.model(collectionName, wordSchema);
  try {
    const word = await PseudoWord.findOne({ french: frenchWord });
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
