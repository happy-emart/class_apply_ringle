import { configureStore } from '@reduxjs/toolkit';
import selectedWeekReducer from './selectedWeekReducer';
import tutorDataReducer from './tutorDataReducer';
import classRequestReducer from './classRequestReducer';
import tuteeDataReducer from './tuteeDataReducer';


const store = configureStore({
  reducer: {
    selectedWeek: selectedWeekReducer,
    tutorData: tutorDataReducer,
    tuteeData: tuteeDataReducer,
    classRequest: classRequestReducer,
  },
});

export default store;
