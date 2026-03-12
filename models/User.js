import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "Administrator",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
