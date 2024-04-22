import { v4 as uuidv4 } from 'uuid';

const UNUSED = 'UNUSED';
const USED = 'USED';

const initialState = {
  tuteeId: uuidv4(),
  tickets: [
    {
      id: 1,
      duration: 20,
      status: UNUSED,
    },
    {
      id: 1,
      duration: 40,
      status: UNUSED,
    },
  ],
  selectedTicket: null,
};

function tuteeDataReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_HALF_TICKET':
      return {
        ...state,
        selectedTicket: findTicket(state.tickets, 20), // return null => no ticket available
      };
    case 'SELECT_FULL_TICKET':
      return {
        ...state,
        selectedTicket: findTicket(state.tickets, 40), // return null => no ticket available
      };
    case 'POP_TICKET':
      return {
        ...state,
        selectedTicket: popTicket(action.payload),
      };
    default:
      return state;
  }
}

function findTicket(tickets, duration) {
  return tickets.find(ticket => (ticket.duration === duration) && (ticket.status === UNUSED));
}

function popTicket(tickets, duration) {
  const ticket = findTicket(tickets, duration);
  ticket.status = USED;
  return ticket;
}

export default tuteeDataReducer;