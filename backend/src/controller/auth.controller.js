import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { loginService, registerService } from "../services/auth.service.js";
dotenv.config();


const register = expressAsyncHandler(async (req, res) => {

    try {
        let response = await registerService(req.body, res);
        res.status(response.status).json({ message: response.message, status: 201 });
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }

})

const login = expressAsyncHandler(async (req, res) => {
    try {
        let response = await loginService(req.body, res);
        res.status(response.status).json({ message: response.message, status: 201 });
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})

const checkAuth = expressAsyncHandler(async (req, res) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            let user = await UserModel.findById(decoded.userId).select('-password');

            req.user = user;

            res.status(200).json({ message: user })
            return;
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
});

const logout = expressAsyncHandler(async(req,res)=>{
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'None',
    });

    res.status(200).json({ message: "Logged out successfully" });
    return;
})

export { register, login, checkAuth, logout }