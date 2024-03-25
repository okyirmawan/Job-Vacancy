import React, { useEffect, useState } from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

const AdminJobs = () => {
    const [job, setJob] = useState(null);
    const [filteredJob, setFilteredJob] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ company: '', city: '', salary: ''});
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    useEffect(() => {
        if (fetchStatus === true) {
            axios.get("https://dev-example.sanbercloud.com/api/job-vacancy")
                .then((res) => {
                    setJob([...res.data.data])
                    setFilteredJob([...res.data.data])
                })
                .catch((error) => {
                })

            setFetchStatus(false)
        }

    }, [fetchStatus, setFetchStatus]);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (fetchStatus) {
            setFetchStatus(false);
        }

        // Filter vacancy data based on query
        const filteredJob = job.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        // Update the vacancy state with filtered data
        setFilteredJob(filteredJob);
    };

    const handleReset = () => {
        setQuery('');
        setFilters({
            company: '',
            city: '',
            salary: ''
        });
        setFilteredJob(job);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        if (fetchStatus) {
            setFetchStatus(false);
        }

        const filteredJob = job.filter(item => {
            const isCompanyMatch = filters.company ? item.company_name.toLowerCase().includes(filters.company.toLowerCase()) : true;
            const isCityMatch = filters.city ? item.company_city.toLowerCase().includes(filters.city.toLowerCase()) : true;
            const isSalaryMatch = filters.salary ? parseFloat(item.salary_min) >= parseFloat(filters.salary) : true;

            return isCompanyMatch && isCityMatch && isSalaryMatch;
        });

        setFilteredJob(filteredJob);
    };

    const handlePriceConversion = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleStatus = (status) => {
        if (status === 1) {
            return <p className="text-sm leading-none text-green-600 dark:text-gray-300 font-bold">Open</p>;
        } else {
            return <p className="text-sm leading-none text-red-600 dark:text-gray-300 font-bold">Closed</p>;
        }
    };

    const handleDelete = (event) => {
        const idData = parseInt(event.target.value);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this data. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`, {
                    headers: { "Authorization": "Bearer " + Cookies.get('token') }
                }).then((res) => {
                    setFetchStatus(true);
                }).catch((error) => {
                    console.error('Delete error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Delete error.',
                        confirmButtonText: 'OK',
                    });
                });
            }
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <nav className="text-gray-600 font-semibold mb-4">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <a href="/" className="text-gray-500">
                            Dashboard
                        </a>
                        <svg
                            className="w-4 h-4 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m9 5 7 7-7 7"/>
                        </svg>
                    </li>
                    <li className="flex items-center">
                        <span className="text-blue-500 hover:text-blue-700">Jobs</span>
                    </li>
                </ol>
            </nav>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">List Jobs</h2>
                <a href="/dashboard/create-jobs" className="bg-green-700 text-white px-4 py-2 rounded-md text-sm">Create</a>
            </div>

            <div className="relative overflow-x-auto">
                <button onClick={toggleFilterVisibility}
                        className="text-blue-500 hover:text-blue-600 focus:outline-none items-center font-bold">
                    {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
                </button>

                {isFilterVisible && (
                    <>
                        <form className="max-w-md mx-auto mt-5 mb-10">
                            <input
                                type="text"
                                placeholder="Search by job title..."
                                className="border border-gray-300 rounded-l-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                onClick={handleSearch}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:ring focus:border-blue-300">
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                Reset
                            </button>
                        </form>

                        <form className="max-w-md mx-auto mb-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text"
                                   name="city"
                                   value={filters.city}
                                   onChange={handleFilterChange}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" "/>
                            <label htmlFor="floating_email"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City
                                Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text"
                                   name="company"
                                   value={filters.company}
                                   onChange={handleFilterChange}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="floating_password"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company
                                Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="number"
                                   name="salary"
                                   value={filters.salary}
                                   onChange={handleFilterChange}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="floating_repeat_password"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Min
                                Salary</label>
                        </div>

                        <button type="submit" onClick={handleFilter}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filter
                        </button>
                    </form>
                    </>
                )}

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tenure
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Logo
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            City
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredJob !== null && filteredJob.map((item, index) => {
                        return (
                            <tr className="bg-white" key={index}>
                                <td className="px-6 py-4 md:whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{item.title}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{item.job_type}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{item.job_tenure}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{handleStatus(item.job_status)}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{item.company_name}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">
                                    <img src={item.company_image_url} width="64px"/>
                                </td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{item.company_city}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">{handlePriceConversion(item.salary_min)} - {handlePriceConversion(item.salary_max)}</td>
                                <td className="px-6 py-4 md:whitespace-nowrap">
                                    <a href={`/dashboard/list-job-vacancy/edit/${item.id}`}
                                       className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm mr-2">Edit</a>
                                    <button onClick={handleDelete} value={item.id}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md text-sm mr-2">Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminJobs;
