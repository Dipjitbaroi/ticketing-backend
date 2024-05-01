import mongoose from "mongoose";
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    key: String,
    url: String,
  },
  { timestamps: false, _id: false }
);
const companySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  comment: { type: String },
  image: { type: String},
  createdAt: 
    { type: Date, default: Date.now },
  updatedAt:
    { type: Date, default: Date.now },

});

const Company = mongoose.model("Company", companySchema);
export default Company;
