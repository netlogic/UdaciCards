export const LOADED_DECKS = 'LOADED_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function loadedDecks (entries) {
  return {
    type: LOADED_DECKS,
    entries,
  }
}

export function addDeck (entry) {
  return {
    type: ADD_DECKS,
    entry,
  }
}