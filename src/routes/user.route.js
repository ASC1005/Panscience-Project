import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Admincheck } from "../middlewares/admin.middleware.js";
import {
    createUser,
    getAllUsers,
    getUserById,
    getUser,
    updateUser,
    deleteUser,
    loginUser
} from "../controllers/user.controller.js";

const router = Router();

router.post("/create", verifyJWT, Admincheck, createUser);
router.get("/get-all", verifyJWT, getAllUsers);
router.post("/login", loginUser);
router.get("/profile", verifyJWT, getUser);
router.get("/get/:id", verifyJWT, Admincheck, getUserById);
router.put("/update/:id", verifyJWT, Admincheck, updateUser);
router.delete("/delete/:id", verifyJWT, Admincheck, deleteUser);

export default router;
