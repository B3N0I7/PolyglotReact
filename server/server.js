const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const wordRoutes = require("./routes/wordRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// app.use("api/words", wordRoutes);
app.use("/api/words", wordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});