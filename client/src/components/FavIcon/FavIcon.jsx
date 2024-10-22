import React from 'react'

const FavIconHeart = ({icon, onClick}) => {
  return (
    <img  src={icon} width={15} className='ms-2' alt="" onClick={onClick} />
  )
}

export default FavIconHeart