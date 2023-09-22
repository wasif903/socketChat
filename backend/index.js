import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Auth from "./routes/Auth.js";
import connectDB from "./db.js";

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working Fine");
});

app.use("/api", Auth);

app.listen(process.env.PORT, () => {
  console.log(`Port Running On PORT: ${process.env.PORT}`);
});
