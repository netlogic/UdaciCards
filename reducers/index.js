import { LOADED_DECKS, ADD_DECK } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case LOADED_DECKS :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default entries