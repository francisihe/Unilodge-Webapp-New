import { Link } from "react-router-dom";
import logo from "../assets/unilodge-logo.jpg"
import { useState } from "react";
import { useSelector } from "react-redux";
import { signOutUser } from "../utils/signOutUser";
import HeaderSearchBar from "./forms/HeaderSearchBar";

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  
  const toggleMenuDropdown = () => {
    setMenuDropdownOpen(!menuDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <header className="flex justify-between items-center md:mb-6">
      <Link to={'/'} className="flex items-center gap-1">
        <img src={logo} alt="UnilodgeNG-logo" className="h-10 w-10" />
        <span className="font-bold text-xl">Unilodge</span>
      </Link>

      {/* <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 invisible lg:visible md:visible">
        Search Bar Goes Here
      </div> */}
      <HeaderSearchBar />

      <button type='button' onClick={toggleMenuDropdown}>
        <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
          <div className="flex gap-2 whitespace-nowrap">
            {/* // Profile Icon with Profile name */}
            
            {currentUser ? <div className="">Hi, {currentUser.firstname}</div> : ''}

            {currentUser
              ? (<div className="bg-orange-600 text-white rounded-full border border-gray-500 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>)
              : (<div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>)}
          </div>

          <div>
            {/* Menu for user profile */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>

          <div>
            {/* Menu Dropdown */}
            {menuDropdownOpen &&
              <div className="absolute border border-orange-400 right-8 md:right-10 lg:right-16 z-10 mt-8 w-40 md:w-48 origin-top-right rounded-md bg-gray-100 shadow-lg">
                <div className=" flex flex-col text-left flex-wrap whitespace-nowrap p-4">
                  <Link to='/profile' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Profile Page</Link>
                  {currentUser 
                  ? <a href="" onClick={handleSignOut} className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Sign Out</a>
                  : <Link to='/signin' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Sign In</Link>
                  }
                </div>
              </div>}
          </div>
        </div>
      </button>

    </header>
  );
}