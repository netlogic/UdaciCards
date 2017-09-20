import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'Decks'
export const SCORES_STORAGE_KEY = 'Scores'

export function fetchDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY);
  }

  export function fetchScores () {
    return AsyncStorage.getItem(SCORES_STORAGE_KEY);
  }

  export function addDeck ({ entry, key }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [key]: entry
    }))
  }

  export function removeDeck( {key} ) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: undefined
      }))
  }

  export function addScore ({ scoreInfo , key }) {
    return AsyncStorage.mergeItem(SCORES_STORAGE_KEY, JSON.stringify({
      [key]: entry
    }))
  }
