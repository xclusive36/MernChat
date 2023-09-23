import mongoose from "mongoose";

mongoose
  .connect(import.meta.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mernchat")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

const db = mongoose.connection;

export default db;
