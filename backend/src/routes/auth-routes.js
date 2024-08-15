import { Router } from "express";
import { login, register, verifyToken } from "../controllers/auth-controller.js";
import { validateSchema } from "../middlewares/validator-middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";

const router = Router();

router.get("/test", (req, res) => {
    res.send("Hola Mundo!");
})

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/verify', verifyToken);

export default router;