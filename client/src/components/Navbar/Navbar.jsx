import React, { useContext } from 'react';
import Logo from "../../assets/images/logo-2.jpeg";
import Logout from "../../assets/images/logout.png";
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';

const Navbar = () => {

    const {logout} = useContext(AppContext);
    

    return (
        <ul className="flex justify-between container mx-auto pt-4 pb-4 items-center rounded">
            <li className="mr-3">
                <img src={Logo} width={80} alt="Company Logo" />
            </li>
            <li className="flex space-x-3">
               <Link to={'/dashboard'}>
               <a  className="inline-block rounded py-2 px-4 transition duration-300 text-black font-bold" href="#">HOME</a>
               </Link>
                <Link to={'/dashboard/favourites'}>
                <a className="inline-block rounded  py-2 px-4 transition duration-300 text-black font-bold" href="#">FAVORITES</a>
                </Link>
            </li>
            <li className="mr-3">
                <img onClick={logout} src={Logout} width={30} className='cursor-pointer' />
            </li>
        </ul>

    )
}

export default Navbar