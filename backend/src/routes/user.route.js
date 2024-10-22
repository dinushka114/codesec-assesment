import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { getFavourites, removeFavorite, saveFavourites } from "../controller/user.controller.js";

const router = express.Router();

router.get("/favourite", checkAuth, getFavourites);
router.post("/favourite", checkAuth, saveFavourites);
router.delete("/favourite/:id", checkAuth, removeFavorite);

export default router;