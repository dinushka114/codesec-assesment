import express from "express";
import {checkAuth} from "../middleware/auth.middleware.js";
import { fetchCategories, fetchMealsByCategory } from "../controller/recipe.controller.js";

const router = express.Router();

router.get("/categories", fetchCategories);
router.get("/:category", fetchMealsByCategory);

export default router;