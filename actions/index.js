export const LOADED_DECKS = 'LOADED_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const SET_STACK_NAVIGATOR = 'SET_STACK_NAVIGATOR';

import { saveAllDecks } from '../utils/apis.js'

export function loadedDecks (decks) {
  return {
    type: LOADED_DECKS,
    decks : decks ? decks.decks : null ,
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title : title,
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
              ]
            },
            JavaScript: {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            },
            'Sample Title': {
                title: 'Sample Title',
                questions: [
                ]
              }
          }
    }
    saveAllDecks( newDecks );
    newDecks.type = LOADED_DECKS;
    return newDecks;
}