import mongoose from "mongoose";
const { Schema } = mongoose;

const userRoleSchema = new Schema({
    userRoleName: { type: String, required: true },
    userRoleDesc: { type: String, required: true },
    userRoleStatus: { type: String, required: true },
    userRoleComment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);
export default UserRole;