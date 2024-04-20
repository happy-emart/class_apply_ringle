import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

const Calendar = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.selectedDay.selectedDay);

  // Determine the start and end of the week of the selected day
  const start = startOfWeek(selectedDay, { weekStartsOn: 0 });
  const end = endOfWeek(selectedDay, { weekStartsOn: 0 });

  // Create a modifier for the days in the selected week
  const modifiers = {
    selectedWeek: { from: start, to: end }
  };

  const handleDayClick = (day) => {
    dispatch({
      type: 'SET_SELECTED_DAY',
      payload: day,
    });
  };

  // Define styles for the selected week
  const modifiersStyles = {
    selectedWeek: {
      color: 'white',
      backgroundColor: '#4f46e5', // Tailwind CSS Indigo 500
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <DayPicker
        className='flex-row flex-wrap'
        mode="single"
        selected={selectedDay}
        onSelect={handleDayClick}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
    </div>
  );
};

export default Calendar;