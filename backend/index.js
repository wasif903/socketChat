// index.mjs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/Auth.js";
import connectDB from "./db.js";
import http from "http";
import { Server } from "socket.io";
import Chat from "./routes/Chat.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.send("Working Fine");
});

app.use("/api", AuthRouter);
app.use("/api", Chat);

server.listen(process.env.PORT, () => {
  console.log(`Port Running On PORT: ${process.env.PORT}`);
});

// Sockets
io.on("connection", (socket) => {
  console.log("Connected To Socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  // socket.on("join chat", ({ }) => {

  // })
});
