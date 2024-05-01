import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const UserSchema = new Schema(
  {
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    bio: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, required: true, default: "English" },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    company: { type: Object, required:false },
    createdAt: 
      { type: Date, default: Date.now },
    updatedAt:
      { type: Date, default: Date.now },

  },
  { timeStamp: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
