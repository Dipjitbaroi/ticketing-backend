import { Router } from "express";
import {
    createUserRole,
    getAllUserRole,
    getUserRoleById,
    updateUserRole,
    deleteUserRole
} from '../controllers/userRole.controller.js'

const router = Router();

router.post("/", createUserRole);
router.get("/", getAllUserRole);
router.get("/:id", getUserRoleById);
router.patch("/:id", updateUserRole);
router.delete("/:id", deleteUserRole);

export default router;