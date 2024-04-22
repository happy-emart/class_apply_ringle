export const selectedWeekAction = (day) => ({
    type: 'SET_SELECTED_WEEK',
    payload: day
});

export const getWeek = state => state.selectedWeek.selectedWeek;  