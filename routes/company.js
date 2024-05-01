import { Router } from "express";
import { addCompany, getCompanys, getCompanyById,getCompanyBySearch,updateCompany,deleteCompany } from "../controllers/company.controller.js";
import { checkToken } from "../middleware/checkToken.js";
import {uploadCompanyFiles} from '../middleware/uploader.js'

const route = Router();

const uploader =  uploadCompanyFiles.single('image')

route.post("/",checkToken, uploader, addCompany);
route.get("/all", checkToken, getCompanys);
route.get("/search", checkToken, getCompanyBySearch);
route.get("/:id",checkToken, getCompanyById);
route.patch("/:id",checkToken, updateCompany);
route.delete("/:id",checkToken, deleteCompany);


export default route;
