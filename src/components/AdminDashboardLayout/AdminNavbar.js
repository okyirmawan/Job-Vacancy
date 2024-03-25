import React, {useState} from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const AdminNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    let navigate = useNavigate();
    const user = JSON.parse(Cookies.get('user'));

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/')
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/icon.png" className="h-8" alt="Flowbite Logo"/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Future Job</span>
            </a>
            <div className="flex items-center">
                {/* Profile menu */}
                <div className="relative">
                    <button onClick={toggleProfileMenu} className="flex items-center focus:outline-none">
                        <img src={user.image_url} alt="User avatar" className="h-8 w-8 rounded-full"/>
                        <span className="ml-2">Admin User</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            <path fillRule="evenodd"
                                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 1a7 7 0 100 14 7 7 0 000-14z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    {/* Profile dropdown */}
                    {isProfileOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                            <a href="/dashboard/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                            <a href="/dashboard/change-password" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Change Password</a>
                            <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;