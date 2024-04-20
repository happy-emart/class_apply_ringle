import React from 'react';

function NavBar() {
  return (
    <nav className="bg-gray-200 px-4 py-2 flex justify-between items-center">
    <div className="flex items-center">
      <img src="/path-to-your-logo/logo.svg" alt="Logo" className="h-10" />
    </div>
    <ul className="flex space-x-4">
      <li><a href="#home" className="text-gray-800 hover:text-gray-600 transition-colors">Home</a></li>
      <li><a href="#registration" className="text-gray-800 hover:text-gray-600 transition-colors">Course Registration</a></li>
      {/* Add other links as needed */}
    </ul>
    </nav>
  );
}

export default NavBar;