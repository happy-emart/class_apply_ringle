import logo from './logo.svg';
import './App.css';
import './util/root.css';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import NavBar from './components/NavBar/NavBar';
import Calendar from './components/CalendarSection/Calendar';
import WeekDisplay from './components/CalendarSection/WeekDisplay';
import TutorList from './components/TutorList/TutorList';

function App() {
  const isTicketSelected = useSelector(state=>state.tuteeData.selectedTicket);
  console.log(isTicketSelected);
  return (
    <div className="App min-h-screen bg-gray-100">
      <NavBar />
      <div className="w-full">
        <div className="flex">
          {/* Calendar on the left */}
          {/* <div className="flex-none w-1/5 border border-solid border-black"> */}
          <div className="border border-solid border-black">
            <Calendar />
          </div>
          {/* WeekDisplay in the middle */}
          {isTicketSelected ? (
            <div className="grow border border-solid border-red">
              <WeekDisplay />
            </div>
          ) : (
            <div className="grow border border-solid border-red flex justify-center items-center">
              <div className="text-center">
                <p>First, select your class ticket</p>
              </div>
            </div>
          )}
          {/* TutorList on the right */}
          <div className="flex-none w-1/5 border-l border-solid border-black">
            <TutorList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
