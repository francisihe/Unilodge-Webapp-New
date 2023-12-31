import { Link, useLocation } from "react-router-dom";
import logo from "../assets/unilodge-logo.jpg"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../utils/signOutUser";
import HeaderSearchBar from "./forms/HeaderSearchBar";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { signOutUserSuccess } from "../redux/user/userSlice.js";


export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user)
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // This function will be called whenever the user clicks outside the dropdown menu
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenuDropdown = () => {
    setMenuDropdownOpen(!menuDropdownOpen);
  };

  const handleSignOut = async () => {
    // Dispatch logout action to clear Redux state
    dispatch(signOutUserSuccess());
    await signOutUser(); // Clears the token from localStorage
  };

  return (
    <>
      <header className="flex justify-between items-center md:mb-6">
        <div>
          <Link to={'/'} className="flex items-center gap-1">
            <img src={logo} alt="UnilodgeNG-logo" className="h-10 w-10" />
            <span className="font-bold text-xl">Unilodge</span>
          </Link>
        </div>

        <div className="hidden md:block">
          {/* Only display this search bar on home and properties page */}
          {location.pathname === '/' ? <HeaderSearchBar /> : ''}
          {location.pathname === '/properties' ? <HeaderSearchBar /> : ''}
        </div>

        <div>
          <button type='button' onClick={toggleMenuDropdown}>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
              <div className="flex gap-2 whitespace-nowrap">
                {/* Profile Icon with Profile name */}
                {currentUser ? <div className="">Hi, {currentUser.firstname}</div> : ''}
                {currentUser ? (
                  <div className="bg-orange-600 text-white rounded-full border border-gray-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <div>
                {/* Menu for user profile - Open and Close Dropdown */}
                {!menuDropdownOpen && <RxHamburgerMenu className="w-5 h-5" />}
                {menuDropdownOpen && <RxCross2 className="w-5 h-5" />}
              </div>

              <div>
                {/* Menu Dropdown */}
                {menuDropdownOpen && (
                  <div ref={dropdownRef} className="absolute border border-orange-400 right-8 md:right-10 lg:right-16 z-10 mt-8 w-40 md:w-2/6 lg:w-1/6 origin-top-right rounded-md bg-gray-100 shadow-lg">
                    <div className="grid text-left flex-wrap whitespace-nowrap">
                      <div className="space-y-3 grid grid-cols-1 md:grid md:grid-cols-1 text-left flex-wrap whitespace-nowrap p-4">
                        <Link to='/' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Homepage</Link>
                        <Link to='/about' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>About</Link>
                        <Link to='/properties' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>View Properties</Link>
                      </div>

                      <div className="space-y-3 grid grid-cols-1 md:grid md:grid-cols-1 border-t-2 text-left flex-wrap whitespace-nowrap p-4">
                        <Link to='/blog' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Our Blog</Link>
                        <Link to='/shop' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Our Shop</Link>
                        <Link to='/contact' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Contact Us</Link>
                      </div>

                      <div className="space-y-3 grid grid-cols-1 md:grid md:grid-cols-1 border-t-2 text-left flex-wrap whitespace-nowrap p-4">
                        <Link to='/profile' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Profile Page</Link>
                        <Link to='/profile/bookings' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Your Bookings</Link>
                        {currentUser ? (
                          <a href="" onClick={handleSignOut} className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Sign Out</a>
                        ) : (
                          <Link to='/signin' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Sign In</Link>
                        )}
                      </div>

                      <div className="space-y-3 grid grid-cols-1 md:grid md:grid-cols-1 border-t-2 text-left flex-wrap whitespace-nowrap p-4">
                        {currentUser && (currentUser.role === 'admin' || currentUser?.role === 'manager') && (
                          <Link to='/admin' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Admin Panel</Link>
                        )}
                        {currentUser && (currentUser.role === 'admin' || currentUser?.role === 'manager') && (
                          <Link to='/add-property' className='hover:bg-orange-400 rounded-lg text-sm indent-3 py-1'>Add Property</Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

      </header>
    </>
  );
}