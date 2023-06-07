import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    key: String
  },
  { versionKey: false }
);

export const User = mongoose.model("user", userSchema);
