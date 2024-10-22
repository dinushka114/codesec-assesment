import UserModel from "../models/user.model.js";

const saveFavouritesService=async(req,userInputs)=>{

    let currentUser = req.user;
    let {meal} = userInputs;

    try {
        let user = await UserModel.findOne({email:currentUser.email});
        user.favourites.push(meal);
        await user.save();
        return {message:"Added to favourites", status:201}
    } catch (error) {
        return {message:error.message, status:500}
    }

}

const removeFavouriteService = async(req)=>{
    let currentUser = req.user;
    let id = req.params.id;
    try {
        let user = await UserModel.findOne({email:currentUser.email});
        user.favourites = user.favourites.filter(meal => meal.idMeal !== id);
        await user.save();
        return {message:"Remove from favourites", status:201}
    } catch (error) {
        return {message:error.message, status:500}
    }
}

const getFavouritesService = async(req)=>{
    
    let currentUser = req.user;
    try {
        let user = await UserModel.findOne({email:currentUser.email});
        return {message:user.favourites, status:200}

    } catch (error) {
        return {message:error.message, status:500}
    }
}

export {saveFavouritesService,getFavouritesService, removeFavouriteService}