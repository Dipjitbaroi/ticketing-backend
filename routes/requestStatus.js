import { Router } from "express";
import {
    addRequestStatus,
    getAllRequestStatus,
    updateRequestStatus,
    deleteRequestStatus
} from "../controllers/requestStatus.controller.js";

const router = Router();

router.post("/", addRequestStatus);
router.get("/", getAllRequestStatus);
router.patch("/:id", updateRequestStatus);
router.delete("/:id", deleteRequestStatus);

export default router;
