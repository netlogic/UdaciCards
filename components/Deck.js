import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

import { AppLoading } from 'expo'

class Deck extends Component {
    state = {
        ready: false,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Deck</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    },
})

export default Deck;
