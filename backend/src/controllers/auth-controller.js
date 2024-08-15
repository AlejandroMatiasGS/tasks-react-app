import bcrypt from "bcrypt"
import { createAccessToken } from "../libs/jwt.js"
import User from "../models/user.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (userFound) return res.status(400).json({ success: false, message: "El email ya está en uso." })

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save();

        const token = await createAccessToken({
            id: userSaved._id,
            username: userSaved.username
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ success: true, message: "Usuario creado con éxito." })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ success: false, message: "Usuario no encontrado." });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ success: false, message: "Contraseña incorrecta." });

        const token = await createAccessToken({
            id: userFound._id,
            username: userFound.username
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ success: true, message: "Login exitoso." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.sendStatus(200);
    });
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    return res.sendStatus(200);
}