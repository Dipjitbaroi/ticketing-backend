import { Router } from "express";
import {
    addPriority,
    getAllPriority,
    updatePriority,
    deletePriority
} from "../controllers/priority.controller.js";

const router = Router();

router.post("/", addPriority);
router.get("/", getAllPriority);
router.patch("/:id", updatePriority);
router.delete("/:id", deletePriority);

export default router;