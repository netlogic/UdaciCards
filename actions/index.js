export const LOADED_DECKS = 'LOADED_DECKS'
export const ADD_DECK = 'ADD_DECK'

import { saveAllDecks } from '../utils/apis.js'

export function loadedDecks (decks) {
  return {
    type: LOADED_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECKS,
    deck,
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
    return {
        type: LOADED_DECKS,
        ...newDecks
    }
}