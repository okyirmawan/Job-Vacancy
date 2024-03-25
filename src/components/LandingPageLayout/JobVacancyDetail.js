import axios from 'axios'
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const JobVacancyDetail = () => {
    const { id } = useParams();
    const [vacancy, setVacancy] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus === true) {
            axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${id}`)
                .then((res) => {
                    setVacancy(res.data)
                })
                .catch((error) => {
                    console.error('Error fetching job vacancy:', error);
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

    const handleStatus = (status) => {
        if (status === 1) {
            return <p className="text-sm leading-none text-green-600 font-bold">Open Hiring</p>;
        } else {
            return <p className="text-sm leading-none text-red-600 font-bold">Closed Hiring</p>;
        }
    };

    return (
        <>
            {vacancy ? (
            <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">

                <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                    <img className="mt-6 w-full" alt="Company"
                         src={vacancy.company_image_url}/>
                </div>
                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    <div className="border-b border-gray-200 pb-6">
                        <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2 mb-2">{vacancy.title} ({vacancy.job_type})</h1>
                        <p className="text-sm leading-none text-gray-600">{vacancy.job_tenure}</p>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 font-bold">Company</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600">{vacancy.company_name}</p>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 font-bold">Status</p>
                        <div className="flex items-center justify-center">
                            {handleStatus(vacancy.job_status)}
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 font-bold">City</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600">{vacancy.company_city}</p>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 font-bold">Description</p>
                        <div className="flex text-right">
                            <p className="text-sm leading-none text-gray-600 ml-10">{vacancy.job_description}</p>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 font-bold">Qualification</p>
                        <div className="flex text-right">
                            <p className="text-sm leading-none text-gray-600 ml-10">{vacancy.job_qualification}</p>
                        </div>
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800 font-bold">Salary</p>
                        <div className="flex items-center justify-center">
                            <p className="text-sm leading-none text-gray-600">{handlePriceConversion(vacancy.salary_min)} - {handlePriceConversion(vacancy.salary_max)}</p>
                        </div>
                    </div>
                    <button
                        className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
                        Apply Now
                    </button>
                </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default JobVacancyDetail;