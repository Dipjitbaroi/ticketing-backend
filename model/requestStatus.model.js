import mongoose from "mongoose";

const { Schema } = mongoose;

const requestStatusSchema = new Schema({
    requestStatusName: { type: String, required: true },
    requestStatusDesc: { type: String, required: true },
    requestStatus: { type: String, required: true },
    requestStatusComment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const RequestStatus = mongoose.model("RequestStatus", requestStatusSchema);
export default RequestStatus;
