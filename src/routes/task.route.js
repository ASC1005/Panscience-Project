import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = Router();

router.get("/get-all", verifyJWT, getAllTasks);  
router.get("/get/:id", verifyJWT, getTaskById);  
router.post("/create", verifyJWT, createTask);  
router.put("/update/:id", verifyJWT, updateTask);  
router.delete("/delete/:id", verifyJWT, deleteTask);  

export default router;
