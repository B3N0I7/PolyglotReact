const express = require("express");
const router = express.Router();
const wordController = require("./../controllers/wordController");

router.get("/", wordController.getAllWords);
router.post("/", wordController.createWord);
router.get("/:id", wordController.getWordById);
router.put("/:id", wordController.updateWord);
router.delete("/:id", wordController.delete);
// Quiz
router.get("/random/english", wordController.getRandomEnglishWord);
router.get("/random/french", wordController.getRandomFrenchWord);
router.post("/verify", wordController.verifyTranslation);

module.exports = router;
