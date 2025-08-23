import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Home, Heart, Share2, Tag, Trash2, LogOutIcon } from "lucide-react";

const Navbar = ({ selectedNav, onNavSelect, setUser }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home" },
    { icon: Heart, label: "Favorites" },
    { icon: Share2, label: "Shared" },
    { icon: Tag, label: "Tags" },
    { icon: LogOutIcon, label: "LogOut" },
  ];

  const handleClick = async (label) => {
    if (label === "LogOut") {
      try {
        await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
        setUser(null);
        navigate("/login");
      } catch (error) {
        console.error("Log out failed:", error);
      }
    } else {
      onNavSelect(label);
    }
  };

  return (
    <div className="w-72 bg-white border-r h-screen border-gray-200">
      <nav className="mt-6 space-y-2 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className="w-full flex items-center gap-4 px-8 py-3 rounded-lg transition-colors"
            >
              <Icon className="w-5 h-5 mr-4 flex-shrink-0" />
              <span className="text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
