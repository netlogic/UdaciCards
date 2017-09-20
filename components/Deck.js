import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { white } from '../utils/colors'

import { AppLoading } from 'expo'

class Deck extends Component {
    state = {
        ready: false,
    }

    render() {
        return (
            <View style={[styles.container,{width : Dimensions.get('window').width - 30 } ]}>
                <Text>{this.props.deck.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 15,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        height : 200,
        marginTop : 10,
        marginBottom : 10,
    },
})

export default Deck;
