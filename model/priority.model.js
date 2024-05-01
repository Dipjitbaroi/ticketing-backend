import mongoose from "mongoose";

const { Schema } = mongoose;

const prioritySchema = new Schema({
    priorityName: { type: String, required: true },
    priorityDesc: { type: String, required: true },
    priorityStatus: { type: String, required: true },
    priorityComment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Priority = mongoose.model("Priority", prioritySchema);
export default Priority;