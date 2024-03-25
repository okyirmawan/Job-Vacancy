import React, {useEffect} from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import AdminFooter from "./AdminFooter";
import {Route, Routes, useNavigate} from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminJobs from "./AdminJobs";
import AdminCreateJob from "./AdminCreateJob";
import AdminEditJob from "./AdminEditJob";
import Cookies from "js-cookie";
import AdminProfile from "./AdminProfile";
import AdminChangePassword from "./AdminChangePassword";
import NotFoundPage from "../NotFoundPage";

const AdminDashboardLayout = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if(Cookies.get('token') === undefined){
            navigate('/login');
        }
    });

    return (
        <div className="flex flex-col min-h-screen">
            <AdminNavbar />

            {/* Main content area */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <AdminSidebar/>

                {/* Main content */}
                <section className="bg-white w-full">
                    <Routes>
                        <Route path='/' element={<AdminDashboard/>}></Route>
                        <Route path='/jobs' element={<AdminJobs/>}></Route>
                        <Route path='/create-jobs' element={<AdminCreateJob/>}></Route>
                        <Route path='/list-job-vacancy/edit/:id' element={<AdminEditJob/>}></Route>
                        <Route path='/profile' element={<AdminProfile/>}></Route>
                        <Route path='/change-password' element={<AdminChangePassword/>}></Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </section>
            </div>

            <AdminFooter/>
        </div>
    );
};

export default AdminDashboardLayout;
