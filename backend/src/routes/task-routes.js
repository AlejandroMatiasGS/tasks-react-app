import { Router } from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/task-controller.js";
import { auth } from "../middlewares/auth-middleware.js"
import { validateSchema } from "../middlewares/validator-middleware.js";
import { createTaskSchema } from "../schemas/task-schema.js";

const router = Router();

router.get("/tasks", auth, getTasks);
router.post("/tasks", auth, validateSchema(createTaskSchema), createTask);
router.get("/tasks/:id", auth, getTask);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

export default router;
//router.post("/getTasks", auth, getTasks)
//router.post("/create", auth, createTask);
// router.post("/getTask")
