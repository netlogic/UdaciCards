import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

export default class AddCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AddCard</Text>
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
