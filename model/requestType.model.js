import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema({
    requestTypeName: { type: String, required: true },
    requestTypeDesc: { type: String, required: true },
    requestStatus: { type: String, required: true },
    requestTypeComment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const RequestType = mongoose.model("RequestType", requestSchema);
export default RequestType;
