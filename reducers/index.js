import { LOADED_DECKS, ADD_DECK } from '../actions'

function decks (state = { decks: {} }, action) {
  switch (action.type) {
    case LOADED_DECKS :
      return {  decks :  action.decks  };
    case ADD_DECK :
      return {
        ...state,
        decks : action.entry
      }
    default :
      return state
  }
}

export default decks