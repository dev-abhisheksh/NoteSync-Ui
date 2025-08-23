import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DataFetching from "./components/DataFetching";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route
        path="/"
        element={
          <div>
            <Header />
            <div className="flex">
              <Navbar setUser={setUser} />
              <DataFetching />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
