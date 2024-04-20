const initialState = {
    selectedDay: new Date(),
};
  
function selectedDayReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_DAY':
      return {
        ...state,
        selectedDay: action.payload,
      };
    default:
      return state;
  }
}
  
export default selectedDayReducer;