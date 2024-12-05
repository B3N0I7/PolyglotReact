const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const wordRoutes = require("./routes/wordRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/api/words", wordRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
