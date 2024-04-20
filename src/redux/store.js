import { configureStore } from '@reduxjs/toolkit';
import selectedDayReducer from './selectedDayReducer';

const store = configureStore({
  reducer: {
    selectedDay: selectedDayReducer,
  },
});

export default store;
