import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DataFetching from "./components/DataFetching";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedNav, setSelectedNav] = useState("Home");
  const location = useLocation();

  // Update selected nav based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelectedNav("Home");
    } else if (path === "/admin") {
      setSelectedNav("Admin");
    } else if (path === "/shared") {
      setSelectedNav("Shared");
    } else if (path === "/tags") {
      setSelectedNav("Tags");
    }
  }, [location.pathname]);

  // Don't show navbar/header on login page
  if (location.pathname === "/login") {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <Header className="flex-shrink-0" />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar stays fixed */}
          <Navbar 
            selectedNav={selectedNav} 
            setUser={setUser} 
            className="flex-shrink-0" 
          />

          {/* Main content area that scrolls */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="p-6">
                    <DataFetching />
                  </div>
                }
              />
              <Route path="/admin" element={<Dashboard />} />
              <Route 
                path="/shared" 
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Shared Notes</h1>
                    <div className="text-center py-12 text-gray-500">
                      Shared notes functionality coming soon!
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/tags" 
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Tags Management</h1>
                    <div className="text-center py-12 text-gray-500">
                      Tags management functionality coming soon!
                    </div>
                  </div>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;