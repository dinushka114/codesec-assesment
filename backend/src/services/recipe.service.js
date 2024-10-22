import axios from "axios"
import { API_CATEGORY_URL, API_MEALS_BY_CATEGORY_URL } from "../utils/constants.js"

const fetchCategoriesService = async()=>{

    let result = await axios.get(API_CATEGORY_URL);
    return { message: result.data.categories.slice(0, 5) , status:200}

}

const fetchMealsByCategoryService = async(category)=>{

    let result = await axios.get(API_MEALS_BY_CATEGORY_URL, {
        params:{
            s:category
        }
    })

    return { message: result.data.meals , status:200}
}

export {fetchCategoriesService, fetchMealsByCategoryService}