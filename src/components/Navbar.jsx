import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Home, Heart, Share2, Tag, Trash2, LogOutIcon, IdCard } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = ({ selectedNav, setUser }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: IdCard, label: "Admin", path: "/admin", target:"_blank" },
    { icon: Share2, label: "Shared", path: "/shared" },
    { icon: Tag, label: "Tags", path: "/tags" },
    { icon: LogOutIcon, label: "LogOut", path: null },
  ];

  const handleClick = async (label, path) => {
    console.log("Nav item clicked:", label);
    
    if (label === "LogOut") {
      try {
        console.log("Attempting logout...");
        
        const response = await axios.post("http://localhost:5000/logout", {}, { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log("Logout response:", response);
        
        // Clear any local storage or session storage if you're using it
        localStorage.clear();
        sessionStorage.clear();
        
        setUser && setUser(null);
        
        toast.success("Successfully logged out!");
        navigate("/login");
      } catch (error) {
        console.error("Log out failed:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        
        // Even if the server request fails, try to clear local state
        setUser && setUser(null);
        localStorage.clear();
        sessionStorage.clear();
        
        toast.error(`❌ Failed to log out: ${error.response?.data?.message || error.message}`);
        
        // Navigate anyway in case it's just a server issue
        navigate("/login");
      }
    } else if (path) {
      // Navigate to the specified route
      navigate(path);
    }
  };

  return (
    <div className="w-full lg:w-72 bg-white border-r lg:h-screen border-gray-200">
      <nav className="mt-2 lg:mt-6 space-y-1 lg:space-y-2 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.label, item.path)}
              className={`w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-8 py-3 rounded-lg transition-colors text-left
                ${selectedNav === item.label 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm lg:text-base font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;