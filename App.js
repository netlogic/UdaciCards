import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import { Constants } from 'expo';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import store from './store'
import Decks from './components/Decks.js'
import Deck from './components/Deck.js'
import NewDeck from './components/NewDeck.js'
import NewQuestion from './components/NewQuestion.js'
import Scores from './components/Scores.js'
import { white, gray, blue } from './utils/colors'
import {setStackNavigator} from './actions'
import Quiz from './components/Quiz'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
    },
  },
  /* for future expansion think about saving and shoowing scores 
  Scores: {
    screen: Scores,
    navigationOptions: {
      tabBarLabel: 'Scores',
      tabBarIcon: ({ tintColor }) => <Entypo name='trophy' size={30} color={tintColor} />
    }
  }
  */
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : blue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  NewQuestion : {
    screen : NewQuestion,
  },
  Quiz : {
    screen : Quiz,
    headerMode : 'none',

  }
})


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={styles.statusBar} />
          <MainNavigator ref={(c) => {
            if (c) {
              store.dispatch(setStackNavigator(c._navigation))
            }
          }} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: blue,
    height: Constants.statusBarHeight,
  },
});
