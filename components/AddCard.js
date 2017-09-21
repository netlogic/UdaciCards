import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'
import { connect } from 'react-redux'

class AddCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add Card</Text>
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


function mapStateToProps(dataState, ownProps) {
    return {
    };
}    

export default connect(
    mapStateToProps,
)(AddCard)