import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {Route, Routes} from 'react-router-dom';
import Home from "./Home";
import JobVacancy from "./JobVacancy";
import {Login} from "./Login";
import JobVacancyDetail from "./JobVacancyDetail";
import {Register} from "./Register";
import NotFoundPage from "../NotFoundPage";

const LandingPageLayout = () => {
    return (
        <>
            {/* Navigation */}
            <Navbar/>

            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/job-vacancy' element={<JobVacancy/>}></Route>
                <Route path='/job-vacancy/:id' element={<JobVacancyDetail/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer/>
        </>
    );
};

export default LandingPageLayout;
