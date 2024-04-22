


const initialState = {
    selectedWeek: new Date(),
};
  
function selectedWeekReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_WEEK':
      return {
        ...state,
        selectedWeek: action.payload,
      };
    default:
      return state;
  }
}
  
export default selectedWeekReducer;