const Word = require("./../models/word");

exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createWord = async (req, res) => {
  const word = new Word({
    english: req.body.english,
    french: req.body.french,
    category: req.body.category,
    difficulty: req.body.difficulty,
  });

  try {
    const newWord = await word.save();
    res.status(200).json(newWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      (word.english = req.body.english || word.english),
        (word.french = req.body.french || word.french),
        (word.category = req.body.category || word.category),
        (word.difficulty = req.body.difficulty || word.difficulty);

      const updateWord = await Word.save();
      res.json(updateWord);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      await word.remove();
      res.json({ message: "Word deleted" });
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Quiz
exports.getRandomEnglishWord = async (req, res) => {
  try {
    const word = await Word.aggregate([{ $sample: { size: 1 } }]);
    res.json({ english: word[0].english, id: word[0]._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRandomFrenchWord = async (req, res) => {
  try {
    const word = await Word.aggregate([{ $sample: { size: 1 } }]);
    res.json({ french: word[0].french, id: word[0]._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyTranslation = async (req, res) => {
  try {
    const { wordId, english, french } = req.body;
    const word = await Word.findById(wordId);

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
