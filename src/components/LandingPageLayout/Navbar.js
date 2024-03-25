import React, {useState} from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="border-gray-500 bg-blue-950 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/icon.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Future Job</span>
                </a>
                <button
                    onClick={handleToggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-expanded={isOpen ? 'true' : 'false'}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto navbar-sticky`} id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 pr-4 pl-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white hover:text-white border-gray-700" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/job-vacancy" className="block py-2 pr-4 pl-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white hover:text-white border-gray-700" aria-current="page">Job Vacancy</a>
                        </li>
                        <li>
                            {!Cookies.get('token') && <a href="/login" className="block py-2 pr-4 pl-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white hover:text-white border-gray-700" aria-current="page">Login</a>}
                            {Cookies.get('token') && <button className="block py-2 pr-4 pl-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:hover:text-white hover:text-white border-gray-700" aria-current="page" onClick={handleLogout}>Logout</button>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;