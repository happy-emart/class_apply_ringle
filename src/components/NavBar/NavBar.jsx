import React from 'react';
import TicketSelect from './TicketSelect'; // Ensure the path is correct based on your directory structure

function NavBar() {
  // const handleSelection = (selected) => {
  //   console.log(`Selected option: ${selected}`); // Or any other action based on the selection
  // };

  return (
    <nav className="bg-gray-200 px-4 py-2 flex justify-between items-center w-full">
      <div className="flex items-center justify-start w-1/3">
        <img src="/path-to-your-logo/logo.svg" alt="Logo" className="h-10" />
      </div>
      <div className="flex justify-center items-center w-1/3">
        {/* <TicketSelect onSelect={handleSelection} /> */}
        <TicketSelect />
      </div>
      <div className="w-1/3"> {/* This empty div acts as a spacer */}
      </div>
    </nav>
  );
}

export default NavBar;
