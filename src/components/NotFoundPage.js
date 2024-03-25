import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">404 - Not Found</h2>
                    <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
