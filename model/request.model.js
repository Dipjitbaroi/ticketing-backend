import mongoose from "mongoose";

const { Schema } = mongoose;

const fileSchema = new Schema(
    {
      key: String,
      url: String,
    },
    { timestamps: false, _id: false }
  );

const requestSchema = new Schema({
    requesterName: {type: String , required:true},
    requestTitle: {type: String , required:true},
    requestDescription: {type: String , required:true},
    requestOccuringUrl: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },
    
    email:{
        type: String,
        required: true,
    },
    requestType: {
        type: Object,
        required: true,
    },
    ticketPriority: {
        type: Object,
        required: true,
    },
    requestStatus: {
        type: Object,
        required: true,
    },

    // requestAssignedTo: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },

    requestComment: { type: String },

    requestOccuringTime : {
        type: Date,
        default: Date.now
    },

    company: {
        type: Object,
        required: true,
    },

    user:{
        type: Object,
        required: true,
    },

    files : {
       type: String,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

})

const Request = mongoose.model("Request", requestSchema);
export default Request;

