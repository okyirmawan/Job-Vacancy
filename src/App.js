import './App.css';
import LandingPageLayout from "./components/LandingPageLayout/LandingPageLayout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import AdminDashboardLayout from "./components/AdminDashboardLayout/AdminDashboardLayout";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/*" element={<LandingPageLayout />} />
                  <Route path="/dashboard/*" element={<AdminDashboardLayout />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
