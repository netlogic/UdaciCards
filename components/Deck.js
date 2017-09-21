import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Alert, Dimensions, TouchableOpacity } from 'react-native'
import { white, blue, green } from '../utils/colors'
import { connect } from 'react-redux'
import ImageButton from './ImageButton'
import { AppLoading } from 'expo'
import {deleteDeck} from '../actions'
import {saveAllDecks} from '../utils/apis'
import store from '../store'

class Deck extends Component {
    state = {
        ready: false,
    }

    constructor(props) {
        super(props);
        this.displayFullDeck = this.displayFullDeck.bind(this)
        this.deleteThisDeck = this.deleteThisDeck.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.deck.title}`,
        headerTintColor: white,
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: blue }
    });

    displayFullDeck() {

        this.props.stackNavigator.navigate('Deck', { deck: this.props.paintDeck })
    }

    renderMiniDeck() {
        let questionText = this.questionText();
        return (
            <TouchableOpacity onPress={this.displayFullDeck}>
                <View style={[styles.container, { width: Dimensions.get('window').width - 30 }]}>
                    <Text style={styles.firstLine}>{this.props.paintDeck.title}</Text>
                    <Text style={styles.secondLine}>{questionText}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    questionText() {
        const numberOfQuestions = this.props.paintDeck.questions.length;
        let questionText;

        if (numberOfQuestions > 1 || numberOfQuestions === 0) {
            questionText = numberOfQuestions + " cards";
        } else {
            questionText = "1 card";
        }
        return questionText;
    }

    deleteThisDeck() {
        Alert.alert(
            'UdaciCards',
            `Are you sure you want to delete this deck?  It cannot be undone.`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                
                {
                    text: 'OK', onPress: () => {
                        // add this deck
                        //
                        this.props.dispatch( deleteDeck( this.props.paintDeck.title ) );
                        // save it out
                        //
                        saveAllDecks( store.getState().decks );
                        this.setState( {text: "" });
                        // go home
                        this.props.stackNavigator.goBack();
                    }
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        if ( !this.props.paintDeck ) {
            // deck is being deleted
            return <Text>deleting...</Text>;
        }

        if (this.props.mini) {
            return this.renderMiniDeck();
        }

        // lets start building out the deck
        //
        return (
            <View style={[styles.fullContainer, { width: Dimensions.get('window').width - 30 }]}>
                <Text style={styles.firstLine}>{this.props.paintDeck.title}</Text>
                <Text style={styles.secondLine}>{this.questionText()}</Text>
                <ImageButton style={{ padding: 10}} imageName='shuffle' onPress={this.addNewDeck}>
                    START QUIZ!
                </ImageButton>
                <ImageButton style={{ padding: 10 }} imageName='plus' onPress={this.addNewDeck}>
                    Add Question
                </ImageButton>
                <ImageButton style={{ padding: 10 }} imageName='trash' onPress={this.deleteThisDeck}>
                    Delete this Deck
                </ImageButton>
            </View>);


        return (<Text>{this.props.paintDeck.title}</Text>);
    }
}

function mapStateToProps(dataState, ownProps) {
    let title;
    let navigate;
    if (ownProps.navigation) {
        title = ownProps.navigation.state.params.deck.title;
        navigate = ownProps.navigation;
    } else {
        title = ownProps.deck.title;
        navigate = dataState.navigation.stackNavigator;
    }

    return {
        paintDeck: dataState.decks.decks ? dataState.decks.decks[title] : null,
        stackNavigator: navigate,
    }
}

export default connect(
    mapStateToProps,
)(Deck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        height: 200,
        marginTop: 10,
        marginBottom: 10,
    },
    fullContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
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
        height: 200,
        marginTop: 10,
        marginBottom: 10,
    },
    firstLine: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: blue,
    },
    secondLine: {
        fontSize: 18,
        textAlign: 'center',
        color: blue,
        marginTop: 15,
    }
})


