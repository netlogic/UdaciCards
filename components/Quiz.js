import React, { Component } from 'react'
import { View, Keyboard, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Text, TextInput, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'
import { connect } from 'react-redux'
import ImageButton from './ImageButton'
import { addQuestionToDeck } from '../actions'
import store from '../store'
import { saveAllDecks } from '../utils/apis.js'

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.questionOrder = null;
        this.state = { score: 0, questionIndex: 0, };
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    });


    checkToAdd() {
        this.setState({ editable: false });
        Alert.alert(
            'UdaciCards',
            `Are you sure you want to add the question '${this.state.question}'?`,
            [
                {
                    text: 'Cancel', onPress: () => {
                        this.setState({ editable: true });
                        console.log('Cancel Pressed')
                    }, style: 'cancel'
                },

                {
                    text: 'OK', onPress: () => {
                        // add this deck
                        //
                        this.props.dispatch(addQuestionToDeck(this.props.title, this.state.question, this.state.answer));
                        // save it out
                        //
                        saveAllDecks(store.getState().decks);
                        this.setState({ text: "" });
                        // go home
                        this.props.navigation.goBack();
                    }
                },
            ],
            { cancelable: false }
        )
    }

    showEnterSomething(msg) {
        Alert.alert(
            'UdaciCards',
            msg || "Please enter a question!",
            [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ],
            { cancelable: false }
        )
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

    deck() {
        let dataState = store.getState();
        return dataState.decks.decks[this.props.title];
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    // create a random array of indexes for the questions
    ensureQuestionOrder() {
        let questions = this.deck().questions;
        if (this.questionOrder && questions.length === this.questionOrder.length) {
            return; // questions are good
        }
        this.questionOrder = [];
        while (this.questionOrder.length < questions.length) {
            let rndIndex = this.getRandomIntInclusive(0, questions.length - 1);
            let found = false;
            for (let q of this.questionOrder) {
                if (q.index === rndIndex) {
                    found = true;
                    break;
                }
            }
            if ( found ) {
                continue;
            }
            this.questionOrder.push({ index: rndIndex });
        }
        console.log( this.questionOrder );
    }

    render() {
        this.ensureQuestionOrder();

        return (
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <KeyboardAvoidingView behavior="padding" >
                        <Text style={styles.titleLine}>{`${this.props.title}`}</Text>
                        <Text style={styles.title}>Question:</Text>
                        <TextInput
                            numberOfLines={2}
                            maxLength={128}
                            multiline={true}
                            placeHolder='Question'
                            style={styles.titleInput}
                            onChangeText={(question) => this.setState({ question })}
                            value={this.state.question} />
                        <Text style={styles.title}>Answer:</Text>
                        <TextInput
                            numberOfLines={10}
                            maxLength={256}
                            multiline={true}
                            placeHolder='Answer'
                            style={styles.titleAnswer}
                            onChangeText={(answer) => this.setState({ answer })}
                            value={this.state.answer} />
                        <ImageButton style={{ padding: 10 }} imageName='plus' onPress={this.addNewQuestion}>
                            Add Question
                </ImageButton>
                        <View style={{ height: 60 }} />
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    },
    titleInput: {
        height: 40,
        borderColor: blue,
        borderWidth: 1,
        color: blue,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        textAlign: 'center',
    },
    titleAnswer: {
        height: 120,
        borderColor: blue,
        borderWidth: 1,
        color: blue,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
        textAlign: 'center',
    },
    titleLine: {
        fontSize: 24,
        margin: 20,
        color: blue,
        textAlign: 'center',

    }
})

function mapStateToProps(dataState, ownProps) {
    let title;
    if (ownProps.navigation) {
        title = ownProps.navigation.state.params.title;
    }
    return {
        title: title,
        navigate: dataState.navigation.stackNavigator
    };
}

export default connect(
    mapStateToProps,
)(Quiz)