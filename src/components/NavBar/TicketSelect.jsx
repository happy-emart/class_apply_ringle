import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHalfTicket, selectFullTicket, getTutee } from './tuteeDataAction';

function TicketSelect() {
  const dispatch = useDispatch();
  const tutee = useSelector(getTutee);
  
  console.log("1");
  console.log(tutee);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedTicket(option); // Set the selected ticket
    setIsDropdownOpen(false); // Close the dropdown menu

    if (option.duration === 20) {
      dispatch(selectHalfTicket());
    } else if (option.duration === 40) {
      dispatch(selectFullTicket());
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-800 hover:text-gray-600 transition-colors">
        {selectedTicket ? `Duration: ${selectedTicket.duration} Minutes` : 'Select Ticket'}
      </button>
      {isDropdownOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          {tutee['tickets'].map((option) => (
            <li key={option.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionSelect(option)}>
              {`Duration: ${option.duration} Minutes`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TicketSelect;
