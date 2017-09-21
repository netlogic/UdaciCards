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
        this.state = { score: 0, questionIndex: 0, showAnswer: false, currentTime : 0 };
        this.showAnswer = this.showAnswer.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    });


    showAnswer() {
        this.setState( { showAnswer : true } );
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
            if (found) {
                continue;
            }
            this.questionOrder.push({ index: rndIndex });
        }
        console.log(this.questionOrder);
    }

    percentRight() {
        let totalQ  = this.deck().questions.length;
        let percent = parseInt( this.state.score / totalQ * 100 );
        if ( percent === 0 ) {
            return '-';
        }
        return this.state.score  + " (" + percent + "%)";
    }

    componentDidMount() {
        if ( !this.startTime ) {
            this.startTime = (new Date()).getTime();
        }
        this.interval = setInterval( ()=> { 
            this.setState( { currentTime : (new Date()).getTime()  } );
        }, 1000 )
    }

    componentWillUnmount() {
        clearInterval( this.interval );
    }

    render() {
        this.ensureQuestionOrder();

        let questionIndex = this.state.questionIndex;
        let question = this.deck().questions[this.questionOrder[questionIndex].index];
        let totalQ  = this.deck().questions.length;

        let timeDisplay;

        if ( this.state.currentTime !== 0 ) {
            let seconds = this.state.currentTime - this.startTime;
            seconds = parseInt( seconds / 1000 );
            timeDisplay = (
                <Text>Time: {seconds}</Text>
            )
        }
    
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleLine}>Quiz:{`${this.props.title}`}</Text>
                    {timeDisplay}
                    <Text style={styles.titleLine}>{`Question: ${questionIndex+1} of ${totalQ}`}</Text>
                    <Text style={styles.titleLine}>{`Correct Answers: ${this.percentRight()}`}</Text>
                    {!this.state.showAnswer && (
                        <View>
                            <Text style={styles.title}>{question.question}</Text>
                            <ImageButton style={{ padding: 10 }} imageName='magnifying-glass' onPress={this.showAnswer}>
                                Show Answer
                            </ImageButton>
                        </View>
                    )
                    }
                    {this.state.showAnswer && (
                        <View>
                        <Text style={styles.title}>{question.answer}</Text>
                        <ImageButton style={{ padding: 10 }} imageName='check' onPress={this.addNewQuestion}>
                                CORRECT!
                        </ImageButton>
                        <ImageButton style={{ padding: 10 }} imageName='cross' onPress={this.addNewQuestion}>
                                INCORRECT!
                        </ImageButton>
                        </View>
                    )
                    }
                    <View style={{ height: 60 }} />
                </View>
            </ScrollView >

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