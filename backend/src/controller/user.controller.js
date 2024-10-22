import expressAsyncHandler from "express-async-handler";
import { getFavouritesService, removeFavouriteService, saveFavouritesService } from "../services/user.service.js";

const saveFavourites = expressAsyncHandler(async(req,res)=>{
    try {
        let response = await saveFavouritesService(req,req.body);
        res.status(response.status).json({message:response.message});
        return
    } catch (error) {
        res.status(500).json({message:error.message})
        return
    }

})

const getFavourites = expressAsyncHandler(async(req,res)=>{
    try {
        let response = await getFavouritesService(req);
        res.status(response.status).json({message:response.message});
        return
    } catch (error) {
        res.status(500).json({message:error.message})
        return
    }
})

const removeFavorite = expressAsyncHandler(async(req,res)=>{
    try {
        let response = await removeFavouriteService(req);
        res.status(response.status).json({message:response.message});
        return
    } catch (error) {
        res.status(500).json({message:error.message})
        return
    }
})

export {saveFavourites, getFavourites, removeFavorite}