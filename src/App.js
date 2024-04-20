import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Calendar from './components/CalendarSection/Calendar';
import WeekDisplay from './components/CalendarSection/Calendar';
import TutorList from './components/TutorList/TutorList';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap md:flex-nowrap md:justify-between">
          {/* Calendar on the left */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Calendar />
          </div>
          {/* WeekDisplay in the middle */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <WeekDisplay />
          </div>
          {/* TutorList on the right */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <TutorList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
