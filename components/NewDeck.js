import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'
import { connect } from 'react-redux'

class NewDeck extends Component {
    constructor(props) {
        super(props);
        this.state = { title : '' } ;

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Name of Deck</Text>
                <TextInput
                    numberOfLines={1}
                    maxLength={64}
                    placeHolder='New title for Deck'
                    style={styles.titleInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
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
    titleInput : {
        height: 40, 
        borderColor: 'blue', 
        borderWidth: 1,
        color : blue 
    }
})

function mapStateToProps(dataState, ownProps) {
    return {
    };
}    

export default connect(
    mapStateToProps,
)(NewDeck)