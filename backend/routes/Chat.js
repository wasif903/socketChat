import express from "express";
import Auth from "../models/Auth.js";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/:userID/chat/:to", async (req, res) => {
  try {
    const { userID, to } = req.params;
    const findUser = await Auth.findById(userID);
    const findTo = await Auth.findById(to);
    if (!findUser || !findTo) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const chat = new Chat({
      userID: findUser._id,
      to: findTo._id,
      message: req.body.message,
    });
    const saveChats = await chat.save();
    res.status(200).json(saveChats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:userID/get-chats/:to", async (req, res) => {
  try {
    const { userID, to } = req.params;
    
    const chats = await Chat.find({
      $or: [
        { userID: userID, to: to },
        { userID: to, to: userID }
      ]
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


export default router;
