import { LOADED_DECKS, ADD_DECK, SET_STACK_NAVIGATOR} from '../actions'


import { combineReducers } from 'redux'


function decks(state = { decks: {} }, action) {
    switch (action.type) {
        case LOADED_DECKS:
            {
                let obj = { ...state };
                obj.decks = action.decks;
                obj.ts =  (new Date).getTime();
                return obj;
            }
        case ADD_DECK:
            {
                let obj = { ...state };
                let decks = obj.decks;
                decks[action.title] = {
                    title : action.title,
                    questions : []
                }
                obj.ts =  (new Date).getTime();
                return obj;
            }
        default:
            return state
    }
}

function navigation(state = {}, action) {
    switch (action.type) {
        case SET_STACK_NAVIGATOR:
            return {
                ...state,
                stackNavigator: action.navigator
            };
        default:
            return state
    }
}


export default combineReducers({
    decks,
    navigation,
}
);