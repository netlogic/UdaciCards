import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from './colors'

export default class Deck extends Component {
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
