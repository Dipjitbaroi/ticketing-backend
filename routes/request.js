import { Router } from "express";
import {
    addRequest,
    getAllRequest,
    updateRequest,
    deleteRequest,
    countRequest,
    countRequestByStatus,
    getUserRequests
} from "../controllers/request.controller.js";

import {checkToken} from '../middleware/checkToken.js';
import {uploadTicketFiles} from '../middleware/uploader.js';

const router = Router();

const uploader =  uploadTicketFiles.single('files')

router.post("/", uploader, addRequest);
router.get("/", checkToken, getAllRequest);
router.patch("/:id",checkToken, uploader, updateRequest);
// /requests/request-by-user/?user_id=645d7bba44c6dab5edccc4f9
router.get("/request-by-user/",checkToken, getUserRequests)
router.delete("/:id",checkToken, deleteRequest);

// example request http://localhost:5001/api/requests/count/645112cda11e46c6a1cf08ee  need to pass the user object id
router.get("/count/:userName",  countRequest);
router.get("/count/:userName/:status",  countRequestByStatus);

export default router;