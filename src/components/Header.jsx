import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white">
      {/* Left: Logo / Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">NoteSync</h1>

      {/* Middle: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Profile Avatar */}
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
