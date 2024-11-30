const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordControllers");

// Create new word
router.post("/add-word/:pseudo", wordController.createWord);
// Quiz
router.get("/random/english/:pseudo", wordController.getRandomEnglishWord);
router.get("/random/french/:pseudo", wordController.getRandomFrenchWord);
router.post("/verify/:pseudo", wordController.verifyTranslation);
// Check collection
router.post("/check-collection", wordController.checkAndCreateCollection);
//  Get by category
router.get("/all-words/:pseudo/:category", wordController.getWordsByCategory);
// Get filtered list
router.get(
  "/all-words/:pseudo/:category/:difficulty",
  wordController.getFilteredAllWords
);
// Update word
router.put("/update-word/:pseudo/:id", wordController.updateWord);
// Get word by id
router.get("/one-word/:pseudo/:id", wordController.getWordById);
// Get word in english
router.get(
  "/one-word-english/:pseudo/:englishWord",
  wordController.getWordByEnglish
);
// Get word in french
router.get(
  "/one-word-french/:pseudo/:frenchWord",
  wordController.getWordByFrench
);

module.exports = router;
