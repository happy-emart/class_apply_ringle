import React, { useState } from 'react';
import { format, addHours, startOfWeek, endOfWeek, eachDayOfInterval, parse, parseISO, isBefore, addMinutes, subMinutes } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { getClass, setClassRequest, freeClassRequest } from './classRequestAction';

const WeekDisplay = () => {
  const selectedWeek = useSelector(state => state.selectedWeek.selectedWeek);
  const tuteeId = useSelector(state => state.tuteeData.tuteeId);
  const ticket = useSelector(state => state.tuteeData.selectedTicket);
  const classRequests = useSelector(state => state.classRequest.classRequest);
  const pendingRequests = useSelector(state => state.classRequest.pendingRequest);
  const numOfBlocks = ticket ? (ticket["duration"] / 10) : 1;
  const dispatch = useDispatch();
  const start = startOfWeek(selectedWeek, { weekStartsOn: 0 }); // Adjust depending on the start of your week
  const end = endOfWeek(selectedWeek, { weekStartsOn: 0 });
  const daysOfWeek = eachDayOfInterval({ start, end });
  const [selected, setSelected] = useState(null);

  const requestedClass = useSelector(state=>state.classRequest.targetRequest);

  const now = new Date(); // Get the current date and time
  const invalidTime = addHours(now, 2); // Calculate the time two hours from now

  const isInvalidTime = (time, day) => {
    const dateTime = parseISO(`${format(day, 'yyyy-MM-dd')}T${time}`);
    return isBefore(dateTime, invalidTime);
  };

  // Generate time slots for each day
  const timeSlots = generateTimeSlots("00:00", "24:00");

  const isSelected = (time, day) => {
    // console.log("Checking selection for: ", time);  // Log only once per function call
    for (let i = 0; i < numOfBlocks; i++) {
      let incrementedTime = subMinutesToTime(time, 10 * i, false);  // Adjusted call to avoid logging
      const selectionId = `${format(day, 'yyyy-MM-dd')}-${incrementedTime}`;
      // console.log("selectionId bf: ", selectionId);  // Conditional logging
      // console.log("nob: ", numOfBlocks);  // Conditional logging
      if (selected === selectionId) {
        // console.log("selectionId af: ", selectionId);  // Conditional logging
        return true;
      }
    }
    return false;
  };
  
  // const addMinutesToTime = (time, minutes, log = true) => {
  //   if (log) console.log("Added minutes to time: ", time);  // Conditional logging
  //   const parsedTime = parse(time, 'HH:mm', new Date());
  //   const newTime = addMinutes(parsedTime, minutes);
  //   return format(newTime, 'HH:mm');
  // };
  const subMinutesToTime = (time, minutes, log = true) => {
    if (log) console.log("Added minutes to time: ", time);  // Conditional logging
    const parsedTime = parse(time, 'HH:mm', new Date());
    const newTime = subMinutes(parsedTime, minutes);
    return format(newTime, 'HH:mm');
  };
  
  const findRequestInSlot = (time, day) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const dateTimeString = `${formattedDay}T${time}`;
    console.log("dateTimeString: ", dateTimeString);
    console.log("pendingRequests: ", pendingRequests[0]);

    const foundPending = pendingRequests.find(req => formatDateTime(req["startTime"]) === dateTimeString);
    const foundClass = classRequests.find(req => formatDateTime(req["startTime"]) === dateTimeString);

    if (foundPending) {
      return 'pending';
    } else if (foundClass) {
      return 'accepted';
    }
    return '';
  };

  const [hoveredSlot, setHoveredSlot] = useState([]);

  // Handle mouse enter on slot
  const handleMouseEnter = (time, day) => {
    if (!isInvalidTime(time, day)) {
      const slotIndex = timeSlots.indexOf(time);
      
      setHoveredSlot(`${format(day, 'yyyy-MM-dd')}-${timeSlots.slice(slotIndex, slotIndex + numOfBlocks).join(',')}`);
      console.log(hoveredSlot);
    }
  };

  // Handle mouse leave on slot
  const handleMouseLeave = () => {
    setHoveredSlot([]);
  };

  const handleCellClick = (time, day) => {
    if (isInvalidTime(time, day)) return;
    const newSelectionId = `${format(day, 'yyyy-MM-dd')}-${time}`;
    // Toggle selection: If the same cell is clicked again, deselect it.
    if (isSelected(time, day)) {
      setSelected(null);  // Deselect if the same cell is clicked
    } else {
      setSelected(newSelectionId);  // Update selection to the new cell
    }
    const dateTime = parseISO(`${format(day, 'yyyy-MM-dd')}T${time}`);
    //addMinutes(dateTime, parseInt(ticket['duration']));

    // console.log(`Selected: ${selected === newSelectionId ? 'Deselected' : newSelectionId}`);

    // Dispatch only if a new selection is made
    if (selected !== newSelectionId) {
      dispatch(setClassRequest({
        tuteeId: tuteeId,
        ticket: ticket,
        date: dateTime,
        // You need to calculate the end time based on the start time and duration
        // end: "calculated end time here" // Example: `${hours + additionalHours}:${newMinutes}`
      }));
    } else {
      dispatch(freeClassRequest());
    }
  };

  return (
    <div className="mt-4">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="bg-white px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-gray-400"></th>
            {daysOfWeek.map((day) => (
              <th key={day} className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-400 border-r-2 border-r-gray-200">
                {format(day, 'EEE MM/dd')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, idx) => (
            <tr key={idx}>
            <td className={`px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-500 relative border-gray-200 ${time.endsWith("00") ? '' : 'text-transparent'}`}>
                {/* Positioning the span at the bottom of the td, then moving it up by 50% of the td's height */}
                <span className="absolute bottom-0 mb-[14%] block">
                  {time}
                </span>
              </td>
              {daysOfWeek.map((day, dayIdx) => {
                const requestStatus = findRequestInSlot(time, day);
                console.log("requestStatus: ", requestStatus);
                return (
                <td key={dayIdx}
                    className={`px-2 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900 hover:shadow-md cursor-pointer border-r-2 border-r-purple-200 
                                ${isSelected(time, day) ? 'bg-ringle-purple shadow' : ''} 
                                ${isInvalidTime(time, day) ? 'text-deep-gray cursor-not-allowed opacity-50 bg-purple-800' : ''} 
                                ${requestStatus === 'pending' ? 'bg-black text-white' : ''}
                                ${requestStatus === 'accepted' ? 'bg-blue-500 text-white' : ''}
                                ${hoveredSlot.includes(`${format(day, 'yyyy-MM-dd')}-${time}`) ? 'bg-ringle-purple shadow' : ''}
                                ${time.endsWith("20")||time.endsWith("50") ? 'border-b-dotted' : ''}`}
                    // onMouseEnter={() => handleMouseEnter(slot.time, day)}
                    // onMouseLeave={handleMouseLeave}
                    onClick={() => handleCellClick(time, day)}>
                  {/* Cell content, if any, goes here */}
                </td>
              )})}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function generateTimeSlots(startTime='04:00', endTime='02:00') {
  const timeSlots = [];
  let currentHour = parseInt(startTime.split(':')[0], 10);
  let currentMinute = parseInt(startTime.split(':')[1], 10);

  while (true) {
    const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
    timeSlots.push(timeString);
    
    // Increment by 20 minutes
    currentMinute += 10;
    if (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour += 1;
    }
    
    // Adjust hour after it surpasses 23 or meets the endTime condition
    if (currentHour === 24) {
      if (endTime === '24:00') break;
        currentHour = 0;
    }
    if (currentHour === parseInt(endTime.split(':')[0], 10) && currentMinute === parseInt(endTime.split(':')[1], 10)) break;
  }
  
  return timeSlots;
}

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth returns 0-11, so we add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Padding single digits with zero for month, day, hours, and minutes
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Constructing the date-time string in 'yyyy-MM-ddTHH:mm' format
  const dateTimeString = `${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`;
  return dateTimeString;
}


export default WeekDisplay;
