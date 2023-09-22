import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGO_URI);
    if (isConnected) {
      return console.log("DB CONNECTED");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
