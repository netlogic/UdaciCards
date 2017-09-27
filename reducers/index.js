import {
    LOADED_DECKS, ADD_DECK, DELETE_DECK,
    ADD_QUESTION, SET_STACK_NAVIGATOR
} from '../actions'


import { combineReducers } from 'redux'


function decks(state = { decks: {} }, action) {
    switch (action.type) {
        case LOADED_DECKS:
            {
                let obj = { ...state };
                obj.decks = action.decks;
                obj.ts = (new Date()).getTime();
                return obj;
            }
        case ADD_DECK:
            {
                let obj = { ...state };
                let decks = obj.decks;
                if ( !decks ) {
                    obj.decks = {};
                    decks = obj.decks;
                }
                decks[action.title] = {
                    title: action.title,
                    questions: [],
                    ts:  (new Date()).getTime()
                }
                obj.ts = (new Date()).getTime();
                return obj;
            }
        case DELETE_DECK:
            {
                let obj = { ...state };
                let decks = obj.decks;
                delete decks[action.title];
                obj.ts = (new Date()).getTime();
                return obj;
            }
        case ADD_QUESTION:
            {
                let obj = Object.assign(  { ts : (new Date()).getTime() } , state )
                let decks = obj.decks;
                decks[action.title] = Object.assign(  { ts  : (new Date()).getTime() }, decks[action.title])
                decks[action.title].questions.push( action.question );
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