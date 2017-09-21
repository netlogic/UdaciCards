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
        this.addQuestion = this.addQuestion.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTintColor: white,
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: blue }
    });

    displayFullDeck() {

        this.props.stackNavigator.navigate('Deck', { title : this.props.title })
    }

    addQuestion() {
        this.props.stackNavigator.navigate('NewQuestion', { title: this.props.title })
    }

    renderMiniDeck() {
        let questionText = this.questionText();
        return (
            <TouchableOpacity key={this.props.ts}  onPress={this.displayFullDeck}>
                <View style={[styles.container, { width: Dimensions.get('window').width - 30 }]}>
                    <Text style={styles.firstLine}>{this.props.title}</Text>
                    <Text style={styles.secondLine}>{questionText}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    questionText() {
        let paintDeck = this.deck();

        const numberOfQuestions = paintDeck.questions.length;
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
                        this.props.dispatch( deleteDeck( this.props.title ) );
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

    deck() {
        let dataState = store.getState();
        return dataState.decks.decks[this.props.title];
    }

    render() {
        let paintDeck = this.deck();

        if ( !paintDeck ) {
            // deck is being deleted
            return <Text>deleting...</Text>;
        }

        if (this.props.mini) {
            return this.renderMiniDeck();
        }

        // lets start building out the deck
        //
        return (
            <View key={this.props.ts} style={[styles.fullContainer, { width: Dimensions.get('window').width - 30 }]}>
                <Text style={styles.firstLine}>{this.props.title}</Text>
                <Text style={styles.secondLine}>{this.questionText()}</Text>
                <ImageButton style={{ padding: 10}} imageName='shuffle' onPress={this.addNewDeck}>
                    START QUIZ!
                </ImageButton>
                <ImageButton style={{ padding: 10 }} imageName='plus' onPress={this.addQuestion}>
                    Add Question
                </ImageButton>
                <ImageButton style={{ padding: 10 }} imageName='trash' onPress={this.deleteThisDeck}>
                    Delete this Deck
                </ImageButton>
            </View>);


        return (<Text>{this.props.title}</Text>);
    }
}

function mapStateToProps(dataState, ownProps) {
    let title;
    let navigate;
    if (ownProps.navigation) {
        title = ownProps.navigation.state.params.title;
        navigate = ownProps.navigation;
    } else {
        title = ownProps.deck.title;
        navigate = dataState.navigation.stackNavigator;
    }

    let ts;
    if ( dataState.decks.decks  ) {
        ts =  dataState.decks.decks[title];
    } else {
        ts = (new Date).getTime();
    }

    return {
        title : title,
        stackNavigator: navigate,
        ts: ts,
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


