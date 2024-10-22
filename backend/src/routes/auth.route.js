import express from "express";
import { register, login, checkAuth, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/", checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;