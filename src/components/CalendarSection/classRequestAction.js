export const setClassRequest = (classSpec) => ({
    type: 'SET_CLASS_REQUEST',
    payload: classSpec
  });

export const freeClassRequest = () => ({
    type: 'FREE_CLASS_REQUEST',
  });

export const acceptClassRequest = (classSpec) => ({
    type: 'ACCEPT_CLASS_REQUEST',
    payload: classSpec
  });
  
export const getClass = state => state.classTicket;