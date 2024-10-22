import axios from "axios";
import { createContext, useState } from "react";
import { API } from "./constants";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

axios.defaults.baseURL = 'https://codesec-production.up.railway.app';
axios.defaults.withCredentials = true;

export function AppProvider({ children }) {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(() => {
        let user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }

        return null;
    });

    const [registerError, setRegisterError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [myFavorites, setMyFavorites] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checkCategory, setCheckCategory] = useState(Array(5).fill(false))
    const [mealsByCategory, setMealsByCategory] = useState([]);
    const [icons, setIcons] = useState(Array( mealsByCategory &&  mealsByCategory.length).fill(false));

    const login = async (email, password) => {
        setLoginError(null);
        let loginResponse = await axios.post(`${API}/auth/login`,
            {
                "email": email,
                "password": password
            }
        ).then(async (res) => {
            let userDataResponse = await axios.get(`${API}/auth`);
            localStorage.setItem("user", JSON.stringify(userDataResponse.data.message));
            setUserData(JSON.stringify(userDataResponse.data.message));

            getFavorites();

            navigate("/dashboard");

        }).catch(err => {
            setLoginError(err.response.data.message);
        })

    }

    const register = async (payload) => {
        await axios.post(`${API}/auth/register`, payload).then(
            res => {
                navigate("/")
            }
        ).catch(err => {
            setRegisterError(err.response.data.message);
        })
    }

    const getFavorites = async () => {
        await axios.get(`${API}/user/favourite`).then(res => {

            const newFavorites = res.data.message;

            setMyFavorites(prevFavorites => {
                const updatedFavorites = [...prevFavorites];
                newFavorites.forEach(newFavorite => {
                    const exists = prevFavorites.some(fav => fav.id === newFavorite.id);
                    if (!exists) {
                        updatedFavorites.push(newFavorite);
                    }
                });

                return updatedFavorites;
            });
        })
    }

    const getCategories = async () => {
        await axios.get(`${API}/recipe/categories`).then(res => {
            setCategories(res.data.message);
        })
    }

    const getMealsByCategories = async (category) => {
        await axios.get(`${API}/recipe/${category}`).then(res => {
            setMealsByCategory(res.data.message);
        })
    }

    const saveFavorite = async (newFavorite, index) => {

        const exists = myFavorites.find(fav => fav.idMeal == newFavorite.idMeal);

        if (!exists) {
            setMyFavorites(prevFavorites => [...prevFavorites, newFavorite]);

            setIcons(prevIcons =>{
                const newIcons = [...prevIcons]
                newIcons[index] = !newIcons[index];
                return newIcons;
            })

            await axios.post(`${API}/user/favourite`, {"meal":newFavorite});
        }

    }

    const removeFavorite = async(id)=>{

        const filteredServices = myFavorites.filter(fav=>fav.idMeal !== id);
        setMyFavorites(filteredServices);

        await axios.delete(`${API}/user/favourite/${id}`);

    }

    const logout = async () => {
        localStorage.removeItem("user");
        navigate("/")
    }


    return (
        <AppContext.Provider value={{
            user: userData,
            login,
            register,
            logout,
            registerError,
            setRegisterError,
            getFavorites,
            myFavorites,
            getCategories,
            categories,
            loginError,
            mealsByCategory,
            getMealsByCategories,
            saveFavorite,
            icons,
            setIcons,
            removeFavorite,
            checkCategory,
            setCheckCategory
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;