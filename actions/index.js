export const LOADED_DECKS = 'LOADED_DECKS'
export const ADD_DECK = 'ADD_DECK'

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