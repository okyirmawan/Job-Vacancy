import axios from 'axios'
import React, {useEffect, useState} from "react";

const JobVacancy = () => {
    const [vacancy, setVacancy] = useState(null);
    const [filteredVacancy, setFilteredVacancy] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ company: '', city: '', salary: ''});
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (fetchStatus) {
            setFetchStatus(false);
        }

        // Filter vacancy data based on query
        const filteredVacancy = vacancy.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        // Update the vacancy state with filtered data
        setFilteredVacancy(filteredVacancy);
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const handleReset = () => {
        setQuery('');
        setFilters({
            company: '',
            city: '',
            salary: ''
        });
        setFilteredVacancy(vacancy);
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

        // Filter vacancy data based on query
        const filteredVacancy = vacancy.filter(item => {
            const isCompanyMatch = filters.company ? item.company_name.toLowerCase().includes(filters.company.toLowerCase()) : true;
            const isCityMatch = filters.city ? item.company_city.toLowerCase().includes(filters.city.toLowerCase()) : true;
            const isSalaryMatch = filters.salary ? parseFloat(item.salary_min) >= parseFloat(filters.salary) : true;

            return isCompanyMatch && isCityMatch && isSalaryMatch;
        });

        // Update the vacancy state with filtered data
        setFilteredVacancy(filteredVacancy);
    };

    useEffect(() => {
        if (fetchStatus === true) {
            axios.get("https://dev-example.sanbercloud.com/api/job-vacancy")
                .then((res) => {
                    setVacancy([...res.data.data]);
                    setFilteredVacancy([...res.data.data])
                })
                .catch((error) => {
                })

            setFetchStatus(false)
        }

    }, [fetchStatus, setFetchStatus]);

    const handlePriceConversion = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <>
            {/* Job listings */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Browse Jobs</h2>
                    <hr/>

                    <div className="items-center text-center">
                        <button onClick={toggleFilterVisibility}
                                className="text-blue-500 hover:text-blue-600 focus:outline-none items-center mt-2 mb-5 font-bold">
                            {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
                        </button>
                    </div>

                    {isFilterVisible && (
                        <>
                            <form className="max-w-md mx-auto mt-5 mb-10">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="flex flex-col md:flex-row">
                                        <input
                                            type="text"
                                            placeholder="Search by job title..."
                                            className="border border-gray-300 rounded-l-md py-2 px-4 mr-2 mb-2 md:mb-0 focus:outline-none focus:ring focus:border-blue-300"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            onClick={handleSearch}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                            Search
                                        </button>&nbsp;
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                            Reset
                                        </button>
                                    </div>
                                </div>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                        {filteredVacancy !== null && filteredVacancy.map((item, index) => {
                            return (
                                <div className="bg-white rounded-lg shadow-md mb-5" key={index}>
                                    <img className="w-full h-32 object-cover rounded-t-lg"
                                         src={item.company_image_url}
                                         alt="Company"/>
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold">{item.title} ({item.job_tenure})</h2>
                                        <h2 className="text-lg font-bold mb-2">{item.company_name}</h2>
                                        <p className="text-gray-600 mb-1">{item.company_city} | {item.job_type}</p>
                                        <p className="text-gray-600 mb-4">{handlePriceConversion(item.salary_min)} - {handlePriceConversion(item.salary_max)}</p>
                                        <a href={`/job-vacancy/${item.id}`}
                                           className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                            <span
                                                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Read More
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    );
}

export default JobVacancy;