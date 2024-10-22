import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import { API_CATEGORY_URL } from "../utils/constants.js";
import { fetchCategoriesService, fetchMealsByCategoryService } from "../services/recipe.service.js";

const fetchCategories = expressAsyncHandler(async(req,res)=>{
    try {
        let response = await fetchCategoriesService();
        res.status(response.status).json({message:response.message});
        return
        
    } catch (error) {
        res.status(500).json({message:error.message})
        return
    }
})

const fetchMealsByCategory = expressAsyncHandler(async(req,res)=>{
    try {
        let category = req.params.category;
        let response = await fetchMealsByCategoryService(category);
        res.status(response.status).json({message:response.message});
        return
    } catch (error) {
        res.status(500).json({message:error.message})
        return
    }
})

export {fetchCategories,fetchMealsByCategory}