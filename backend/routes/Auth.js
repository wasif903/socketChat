import express from "express";
import Auth from "../models/Auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const userExists = await Auth.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User Already Exists With This Email" });
    } else {
      const createUser = new Auth({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      await createUser.save();
      res.status(200).json({ message: "Signup Successful", user: createUser });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const findUser = await Auth.findOne({
      email: req.body.email,
    });
    
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (findUser.password === req.body.password) {
      res
        .status(200)
        .json({ message: "Logged In Successfully", user: findUser });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
