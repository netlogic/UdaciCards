import React, { Component } from 'react'
import { View, Keyboard, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Text, TextInput, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'
import { connect } from 'react-redux'
import ImageButton from './ImageButton'
import { addQuestionToDeck } from '../actions'
import store from '../store'
import { saveAllDecks } from '../utils/apis.js'

class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = { question: '', answer: '', editable: true };
        this.addNewQuestion = this.addNewQuestion.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `NEW QUESTION`,
        headerTintColor: white,
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: blue }
    });

    addNewQuestion() {
        let found = false;
        let check = this.state.question.toUpperCase();

        Keyboard.dismiss();


        if (check.length === 0) {
            this.showEnterSomething();
            return;
        }
        if (this.state.answer.length === 0) {
            this.showEnterSomething('Please enter the answer!');
            return;
        }
        this.checkToAdd();
    }

    checkToAdd() {
        this.setState({ editable: false });
        Alert.alert(
            'UdaciCards',
            `Are you sure you want to add the question '${this.state.question}'?`,
            [
                {
                    text: 'Cancel', onPress: () => {
                        this.setState({ editable: true });
                        //console.log('Cancel Pressed')
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

    render() {
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
        fontSize : 18,
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
        fontSize : 18,
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
)(NewQuestion)