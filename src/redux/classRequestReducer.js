import { useSelector } from "react-redux";

const initialState = {
  pendingRequest: [],
  classRequest: [],
  targetRequest: null
  /*
  pending format:
      {
          tutorId: 1,
          tuteeId: 1,
          ticket: {
              id: 1,
              duration: 20,
              status: USED  
          },
          status: 0
      }
  class format:
      {
          tutorId: 1,
          tuteeId: 1,
          ticket: {
              id: 1,
              duration: 20,
              status: USED  
          },

      }
  target format:
      {
          tuteeId: 1,
          ticket: {
              id: 1,
              duration: 20,
              status: UNUSED  
          },
          date: ,
          start: ,
        }
  */

};

// Select request.
export const selectClassRequest = state => state.classRequest;

// Add in pending request.
export const addPendingRequest = (tutorId, tuteeId, ticket, startTime) => {

  return {
    type: 'ADD_PENDING_REQUEST',
    payload: { tutorId, tuteeId, ticket, status: 0, startTime}
  };
};

// Add all pending request to class request.
export const acceptPendingRequest = (pendingRequest) => ({
  type: 'ACCEPT_CLASS_REQUEST',
  payload: pendingRequest
});

export function classRequestReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CLASS_REQUEST': // set by tutee
      console.log("reach here.");
      return {
        ...state,
        targetRequest: action.payload,
      };
    case 'FREE_CLASS_REQUEST': // set by tutee
      return {
        ...state,
        targetRequest: null,
      };
    case 'ACCEPT_CLASS_REQUEST': // sent by tutor
      if (action.payload.length !== 0) {
        return {
          ...state,
          classRequest: [...state.classRequest, ...action.payload],
          pendingRequest: []
        };
      }
      else {
        return {
          ...state,
          classRequest: state.classRequest,
          pendingRequest: state.pendingRequest
        }
      }
    case 'ADD_PENDING_REQUEST': // add pending request
      return {
        ...state,
        pendingRequest: [...state.pendingRequest, action.payload]
      }
    default:
      return state;
  }
}

export default classRequestReducer;