import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

export const Register = () => {
    const [input, setInput] = useState({
        name : "",
        image_url : "",
        email : "",
        password : ""
    });

    let navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;

        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault()
        axios.post('https://dev-example.sanbercloud.com/api/register', input)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Register Success!',
                    confirmButtonText: 'OK',
                    timer: 2000, // Set the timer to 2000 milliseconds (2 seconds)
                    timerProgressBar: true, // Enable the progress bar
                });
                navigate('/login');
            })
            .catch((error) => {
                console.error('Register error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed Register.',
                    confirmButtonText: 'OK',
                });
            });
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="email" onChange={handleInput} value={input.name}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                                <input type="text" name="image_url" id="email" onChange={handleInput} value={input.image_url}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" onChange={handleInput} value={input.email}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password"
                                       onChange={handleInput} value={input.password}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}