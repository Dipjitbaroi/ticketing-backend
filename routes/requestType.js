import { Router } from "express";
import { 
    addRequestType,
    getAllRequestType,
    getRequestTypeById,
    updateRequestType,
    deleteRequestType 
} from "../controllers/requestType.controller.js";

const router = Router();

router.post("/", addRequestType);
router.get("/", getAllRequestType);
router.get("/:id", getRequestTypeById);
router.patch("/:id", updateRequestType);
router.delete("/:id", deleteRequestType);


export default router;
