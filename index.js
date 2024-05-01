import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import companyRoute from "./routes/company.js";
import requestType from "./routes/requestType.js"
import requestStatus from "./routes/requestStatus.js"
import priority from './routes/priority.js'
import userRole from './routes/userRole.js'
import requests from './routes/request.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());
app.use(express.json());
const CONNECTION_URL = process.env.DB_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connections successfull");
});
app.use('/files', express.static('files'));
app.use("/api/users/", userRoute);
app.use("/api/company/", companyRoute);
app.use('/api/request-type/',requestType);
app.use('/api/request-status/',requestStatus);
app.use('/api/priority/',priority);
app.use('/api/user-role/',userRole);
app.use('/api/requests/',requests);

app.listen(port, () => console.log(`Listening on port ${port}`));
