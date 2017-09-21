export const LOADED_DECKS = 'LOADED_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const SET_STACK_NAVIGATOR = 'SET_STACK_NAVIGATOR';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_QUESTION  = 'ADD_QUESTION';

import { saveAllDecks } from '../utils/apis.js'

export function loadedDecks (decks) {
  return {
    type: LOADED_DECKS,
    decks : decks ? decks.decks : null ,
  }
}

export function deleteDeck( title ) {
    return {
        type: DELETE_DECK,
        title : title,
    }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title : title,
  }
}

export function addQuestionToDeck( title, question, answer ) {
    return {
        type : ADD_QUESTION,
        title : title, 
        question : {
            question : question,
            answer : answer
        }
    }
}

export function setStackNavigator( navigator ) {
    return {
        type : SET_STACK_NAVIGATOR,
        navigator
    }
}

export function addExampleDecks ( ) {
    let newDecks = {
        decks: {
            React: {
              title: 'React',
              questions: [
                {
                  question: 'What is React?',
                  answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ],
              ts:  (new Date).getTime()
            },
            JavaScript: {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ],
              ts:  (new Date).getTime()
            },
            'Sample Title': {
                title: 'Sample Title',
                questions: [
                ],
                ts:  (new Date).getTime()
              }
          }
    }
    saveAllDecks( newDecks );
    newDecks.type = LOADED_DECKS;
    return newDecks;
}