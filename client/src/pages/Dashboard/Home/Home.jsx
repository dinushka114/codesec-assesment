import React, { useContext, useEffect } from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton'
import AppContext from '../../../AppContext'
import HeartSolid from "../../../assets/heart-solid.svg";
import HeartRegular from "../../../assets/heart-regular.svg";
import FavIconHeart from '../../../components/FavIcon/FavIcon';

const Home = () => {

  const { categories, getCategories, mealsByCategory, getMealsByCategories, saveFavorite, icons, checkCategory, setCheckCategory } = useContext(AppContext);

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className='container mx-auto'>
      <div className="flex flex-wrap gap-6">

        {
          categories.map((cat, index) => {
            return (
              <div className='w-32'>
                <CustomButton onClick={() => {
                  getMealsByCategories(cat.strCategory)
                  
                }

                } text={cat.strCategory} isRoundedFull={true} isChecked={checkCategory[index]} />
              </div>
            )
          })
        }
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {
          mealsByCategory && mealsByCategory.map((meal, index) => {
            return (
              <div>
                <img className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-3xl" src={meal.strMealThumb} alt="" />
                <div className='mt-4'>
                  <p className='font-normal text-gray-500 flex'>{meal.strCategory} <FavIconHeart onClick={() => saveFavorite(meal, index)} icon={icons[index] ? HeartSolid : HeartRegular} />  </p>
                  <p className='font-bold text-wrap'>{meal.strMeal}</p>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>

  )
}

export default Home