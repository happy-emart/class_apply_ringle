import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { startOfWeek, endOfWeek, isBefore, isAfter, startOfDay, subHours } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { selectedWeekAction, getWeek } from './selctedWeekAction';

const Calendar = () => {
  const dispatch = useDispatch();
  const selectedWeek = useSelector(getWeek);

  // Determine the start and end of the week of the selected day
  const today = startOfDay(new Date());
  const start = startOfWeek(selectedWeek, { weekStartsOn: 0 });
  const end = endOfWeek(selectedWeek, { weekStartsOn: 0 });
  const [hoveredDay, setHoveredDay] = useState(null);
  const startOfHoveredWeek = hoveredDay ? startOfWeek(hoveredDay, { weekStartsOn: 0 }) : null;
  const endOfHoveredWeek = hoveredDay ? endOfWeek(hoveredDay, { weekStartsOn: 0 }) : null;

  // Create a modifier for the days in the selected week
  const modifiers = {
    selectedWeek: { from: start, to: end },
    hoverWeek: hoveredDay ? { from: startOfHoveredWeek, to: endOfHoveredWeek } : undefined,
    disabled: { before: today } // Disables any day before today
  };
  // console.log(modifiers["selectedWeek"]);

  const handleDayClick = (day) => {
    if (!day || isBefore(day, today)) return;
    else {
      dispatch(selectedWeekAction(day));
      dispatch({
        type: 'FREE_CLASS_REQUEST'
      });
      setHoveredDay(null);
    }
  };

  const handleDayMouseEnter = (day) => {
    let flagBefore = isBefore(day, end);
    let flagAfter = isAfter(day, subHours(start, 1));
    // console.log("ㅋㅎㅎㅎㅋㅋ");
    if (flagBefore && flagAfter) return;
    else {
      setHoveredDay(day);
      // console.log("ㅋㅋㅋ");
    }  
  };

  const handleDayMouseLeave = () => {
    setHoveredDay(null);
  };

  // Define styles for the selected week
  const modifiersStyles = {
    selectedWeek: {
      color: 'white',
      backgroundColor: '#8B00FF', // Tailwind CSS Indigo 500
    },
    hoverWeek: {
      backgroundColor: '#9274FC', // A lighter shade of the selected color for hover
    },
    disabled: {
      color: 'gray',
      backgroundColor: 'transparent',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <DayPicker showOutsideDays
        mode="single"
        selected={selectedWeek}
        onSelect={handleDayClick}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        onDayMouseEnter={handleDayMouseEnter}
        onDayMouseLeave={handleDayMouseLeave}
      />
    </div>
  );
};

export default Calendar;
