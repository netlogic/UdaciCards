import React, { Component } from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'
import { connect } from 'react-redux'
import ImageButton from './ImageButton'

class NewDeck extends Component {
    constructor(props) {
        super(props);
        this.state = { text : '' } ;
        this.addNewDeck = this.addNewDeck.bind(this);
    }

    addNewDeck() {
        let found = false;
        let check = this.state.text.toUpperCase();

        for ( let title in this.props.decks ) {
            if ( title.toUpperCase() === check ) {
                found = true;
                break;
            }
        }
        if ( found ) {
            this.errorDeckAlreadyExists();
            return;
        }
    }

    errorDeckAlreadyExists() {
        Alert.alert(
            'UdaciCards',
            "This deck name already exists please try another!",
            [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ],
            { cancelable: false }
        )
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
        textAlign : 'center',
    },
    titleLine : {
        fontSize : 24,
        margin : 20,
        color : blue,
        textAlign : 'center',

    }
})

function mapStateToProps(dataState, ownProps) {
    return {
        decks : dataState.decks.decks
    };
}    

export default connect(
    mapStateToProps,
)(NewDeck)