import React, {useEffect, useState} from "react";
import Cookies from "js-cookie"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

export const Login = () => {
    const [input, setInput] = useState({
        email : "",
        password : ""
    });
    let navigate = useNavigate();

    useEffect(() => {
        if(Cookies.get('token') !== undefined){
            navigate('/dashboard');
        }
    });

    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name
        setInput({...input, [name] : value})
    };

    const handleLogin = (event) => {
        event.preventDefault()

        let {email, password} = input

        axios.post(`https://dev-example.sanbercloud.com/api/login`, {email, password})
            .then((res) => {
                Cookies.set('token', res.data.token);
                Cookies.set('user', JSON.stringify(res.data.user));

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login Success!',
                    confirmButtonText: 'OK',
                    timer: 2000, // Set the timer to 2000 milliseconds (2 seconds)
                    timerProgressBar: true, // Enable the progress bar
                });
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Login error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Login failed. Please check your email and password.',
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
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input type="email" name="email" id="email" onChange={handleChange} value={input.email}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" onChange={handleChange} value={input.password}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                               required/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember
                                            me</label>
                                    </div>
                                </div>
                                <button
                                   className="text-sm font-medium text-primary-600 hover:underline dark:text-white">Forgot
                                    password?</button>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}