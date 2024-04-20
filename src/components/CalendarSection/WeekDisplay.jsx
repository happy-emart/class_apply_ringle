import React from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useSelector } from 'react-redux';

const WeekDisplay = ({ selectedDay }) => {
  const start = startOfWeek(selectedDay, { weekStartsOn: 0 }); // Adjust depending on the start of your week
  const end = endOfWeek(selectedDay, { weekStartsOn: 0 });
  const daysOfWeek = eachDayOfInterval({ start, end });
  const selectedDay = useSelector(state => state.selectedDay.selectedDay);

  // Generate time slots for each day
  const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  return (
    <div className="mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {daysOfWeek.map(day => (
              <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {format(day, 'EEE dd/MM')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timeSlots.map((time, idx) => (
            <tr key={idx}>
              {daysOfWeek.map(day => (
                <td key={day} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {time}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeekDisplay;
