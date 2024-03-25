import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

const AdminChangePassword = () => {
    const [input, setInput] = useState(
        {
            current_password: "",
            new_password: "",
            new_confirm_password: ""
        }
    )

    const handleInput = (event) => {
        const { name, value } = event.target;

        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    }

    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        // create
        axios.post('https://dev-example.sanbercloud.com/api/change-password', input, {headers: {"Authorization" : "Bearer "+ Cookies.get('token')}})
            .then((res) => {
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Change password error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed change password.',
                    confirmButtonText: 'OK',
                });
            });
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8 border-2">
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="current_password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current
                            Password</label>
                        <input type="password" name="current_password" onChange={handleInput}
                               value={input.current_password}
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                               required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="new_password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
                            Password</label>
                        <input type="password" name="new_password" onChange={handleInput} value={input.new_password}
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                               required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="new_confirm_password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New
                            Password</label>
                        <input type="password" name="new_confirm_password" onChange={handleInput} value={input.new_confirm_password}
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                               required/>
                    </div>
                    {/*<div className="mb-5">*/}
                    {/*    <label htmlFor="new_confirm_password"*/}
                    {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New*/}
                    {/*        Password</label>*/}
                    {/*    <input type="new_confirm_password" onChange={handleInput} value={input.new_confirm_password}*/}
                    {/*           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"*/}
                    {/*           required/>*/}
                    {/*</div>*/}
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="terms" type="checkbox" defaultValue
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                   required/>
                        </div>
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I
                            agree
                            with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and
                                conditions</a></label>
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change
                        Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminChangePassword;
