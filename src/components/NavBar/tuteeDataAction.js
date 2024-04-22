export const selectHalfTicket = () => ({
    type: 'SELECT_HALF_TICKET',
  });
  
export const selectFullTicket = () => ({
    type: 'SELECT_FULL_TICKET',
  });
  
export const popTicketAction = (duration) => ({
    type: 'POP_TICKET',
    payload: duration
  });
  
export const getTutee = state => state.tuteeData;  