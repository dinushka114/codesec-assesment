import React, { useContext, useEffect } from 'react'
import AppContext from '../../../AppContext'
import FavIconHeart from '../../../components/FavIcon/FavIcon';
import HeartRegular from "../../../assets/heart-regular.svg";
import HeartSolid from "../../../assets/heart-solid.svg";

const Favourites = () => {

  const { getFavorites, myFavorites, removeFavorite } = useContext(AppContext);

  useEffect(() => {
    getFavorites();
  }, [])

  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {
         myFavorites && myFavorites.map((fav, index) => {
            return (
              <div>
                <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-3xl mt-8" src={fav.strMealThumb} alt="" />
                <div className='mt-4'>
                  <p className='font-normal text-gray-500 flex'>{fav.strCategory} <FavIconHeart onClick={()=>removeFavorite(fav.idMeal)} icon={HeartSolid} /></p>
                  <p className='font-bold text-wrap'>{fav.strMeal}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}

export default Favourites