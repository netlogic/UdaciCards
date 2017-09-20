import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from './colors'

export default class NewDeck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>NewDeck</Text>
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
