import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'
import { connect } from 'react-redux'
import ImageButton from './ImageButton'

class NewDeck extends Component {
    constructor(props) {
        super(props);
        this.state = { title : '' } ;
        this.addNewDeck = this.addNewDeck.bind(this);
    }

    addNewDeck() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleLine}>Please enter the title of your new deck</Text>
                <TextInput
                    numberOfLines={1}
                    maxLength={64}
                    placeHolder='New title for Deck'
                    style={styles.titleInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
                <ImageButton style={{ padding: 10 }} imageName='add-to-list' onPress={this.addNewDeck}>
                    Add New Deck
                </ImageButton>
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
        borderColor: blue, 
        borderWidth: 1,
        color : blue ,
        paddingLeft : 10,
        paddingRight : 10 , 
        margin : 10,
    },
    titleLine : {
        fontSize : 24,
        margin : 20,
        color : blue,

    }
})

function mapStateToProps(dataState, ownProps) {
    return {
    };
}    

export default connect(
    mapStateToProps,
)(NewDeck)