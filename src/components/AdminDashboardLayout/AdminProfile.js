import React from "react";
import Cookies from "js-cookie";
const AdminProfile = () => {
    const user = JSON.parse(Cookies.get('user'));

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Profile image */}
                <div className="relative">
                    <img
                        className="w-full h-48 object-cover object-center rounded-t-lg"
                        src="/background.jpg"
                        alt="Profile"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <img
                            className="h-24 w-24 rounded-full border-4 border-white"
                            src={user.image_url}
                            alt="Profile"
                        />
                    </div>
                </div>
                {/* Bio data card */}
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{user.email}</h2>
                    <p className="text-gray-600"><b>Account ID</b> : {user.id}</p>
                    <p className="text-gray-600"><b>Created Date</b> : {user.created_at}</p>
                    <p className="text-gray-600"><b>Updated Date</b> : {user.updated_at}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
