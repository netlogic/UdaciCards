import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Alert, Dimensions, TouchableOpacity } from 'react-native'
import { white, blue } from '../utils/colors'
import { connect } from 'react-redux'

import { AppLoading } from 'expo'

class Deck extends Component {
    state = {
        ready: false,
    }

    constructor(props) {
        super(props);
        this.displayQuiz = this.displayQuiz.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.deck.title}`,
        headerTintColor: white,
        headerTitleStyle: {  color: 'white' },
        headerStyle : { backgroundColor : blue }
    });

    displayQuiz() {

        this.props.stackNavigator.navigate('Deck', { deck: this.props.paintDeck })
    }

    renderMiniDeck() {
        let questionText = this.questionText();
        return (
            <TouchableOpacity onPress={this.displayQuiz}>
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

    render() {

        if (this.props.mini) {
            return this.renderMiniDeck();
        }

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


