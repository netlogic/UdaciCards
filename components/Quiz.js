import React, { Component } from 'react'
import { View, Dimensions, Keyboard, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Text, TextInput, StyleSheet } from 'react-native'
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
        this.promptingUser = false;
        this.state = { score: 0, questionIndex: 0, showAnswer: false, currentTime: 0 };
        this.showAnswer = this.showAnswer.bind(this);
        this.correctAnswer = this.correctAnswer.bind(this);
        this.wrongAnswer = this.wrongAnswer.bind(this);
        this.exitQuiz = this.exitQuiz.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.exitQuizWithPrompt = this.exitQuizWithPrompt.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    });


    showAnswer() {
        this.setState(previousState => {
            return { ...previousState, showAnswer: true };
        });
    }

    playAgain() {
        this.startTime = (new Date()).getTime();
        this.questionOrder = null; // juggle the question order
        this.setState(previousState => {
            return {
                ...previousState,
                questionIndex: 0,
                showAnswer: false,
                score: 0,
                currentTime: (new Date()).getTime()
            }
        });
    }

    exitQuiz() {
        this.props.navigation.goBack();
    }

    exitQuizWithPrompt() {
        this.promptingUser = true;
        Alert.alert(
            'UdaciCards',
            `Are you sure you want to exit this quiz?`,
            [
                {
                    text: 'Cancel', onPress: () => {
                        this.promptingUser = false;
                    }, style: 'cancel'
                },

                {
                    text: 'OK', onPress: () => {
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

    wrongAnswer() {
        this.setState(previousState => {
            return {
                ...previousState,
                questionIndex: previousState.questionIndex + 1,
                showAnswer: false
            }
        });

    }

    correctAnswer() {
        this.setState(previousState => {
            return {
                ...previousState,
                score: previousState.score + 1,
                questionIndex: previousState.questionIndex + 1,
                showAnswer: false
            }
        });
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
        let totalQ = this.deck().questions.length;
        let percent = parseInt(this.state.score / totalQ * 100);
        if (percent === 0) {
            return '-';
        }
        return this.state.score + " (" + percent + "%)";
    }

    componentDidMount() {
        if (!this.startTime) {
            this.startTime = (new Date()).getTime();
        }
        this.interval = setInterval(() => {
            let questionIndex = this.state.questionIndex;
            let totalQ = this.deck().questions.length;
            if (questionIndex === totalQ || this.promptingUser ) {
                return; // nothing to do
            }
            this.setState({ currentTime: (new Date()).getTime() });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderQuizIsDone() {
        let totalQ = this.deck().questions.length;

        let timeDisplay;

        if (this.state.currentTime !== 0) {
            let seconds = this.state.currentTime - this.startTime;
            seconds = parseInt(seconds / 1000);
            timeDisplay = (
                <Text style={styles.quizLine}>It took {seconds} seconds!</Text>
            )
        } else {
            timeDisplay = (
                <Text style={styles.quizLine}>>It was fast!</Text>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.quizLine}>You Finished!</Text>
                <Text style={styles.quizLine}>Deck - {`${this.props.title}`}</Text>
                <Text style={styles.quizLine}>{`Correct Answers: ${this.percentRight()}`}</Text>
                {timeDisplay}
                <ImageButton style={{ padding: 10 }} imageName='shuffle' onPress={this.playAgain}>
                    RESTART QUIZ!
                </ImageButton>
                <ImageButton style={{ padding: 10 }} imageName='reply' onPress={this.exitQuiz}>
                    Back to Deck
                </ImageButton>
            </View>
        )
    }

    render() {
        this.ensureQuestionOrder();

        let questionIndex = this.state.questionIndex;
        let totalQ = this.deck().questions.length;
        if (questionIndex === totalQ) {
            return this.renderQuizIsDone();
        }

        let question = this.deck().questions[this.questionOrder[questionIndex].index];


        let timeDisplay;

        if (this.state.currentTime !== 0) {
            let seconds = this.state.currentTime - this.startTime;
            seconds = parseInt(seconds / 1000);
            timeDisplay = (
                <Text style={styles.timeText}>Time: {seconds}</Text>
            )
        } else {
            timeDisplay = (
                <Text style={styles.timeText}>Time: 0</Text>
            )
        }

        return (
            <ScrollView style={styles.container}>
                <View>
                    {timeDisplay}
                    <Text style={styles.quizLine}>Quiz:{`${this.props.title}`}</Text>
                    <Text style={styles.titleLine}>{`Correct Answers: ${this.percentRight()}`}</Text>
                    <Text style={styles.titleLine}>{`Question: ${questionIndex + 1} of ${totalQ}`}</Text>

                    {!this.state.showAnswer && (
                        <View>
                            <Text style={styles.title}>{question.question}</Text>
                            <ImageButton style={{ padding: 10 }} imageName='magnifying-glass' onPress={this.showAnswer}>
                                Show Answer
                            </ImageButton>
                            <View style={{ height: 86 }} />
                        </View>
                    )
                    }
                    {this.state.showAnswer && (
                        <View>
                            <Text style={styles.title}>{question.answer}</Text>
                            <ImageButton style={{ padding: 10 }} imageName='check' onPress={this.correctAnswer}>
                                CORRECT!
                            </ImageButton>
                            <ImageButton style={{ padding: 10 }} imageName='cross' onPress={this.wrongAnswer}>
                                INCORRECT!
                            </ImageButton>
                            <View style={{ height: 20 }} />
                        </View>
                    )
                    }
                    <View style={{ height: 60 }} />
                </View>
                <View style={styles.buttonExit}>
                    <ImageButton style={{ padding: 10 }} imageName='reply' onPress={this.exitQuizWithPrompt}>
                        Back to Deck
                            </ImageButton>
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
    buttonExit: {
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: Dimensions.get('window').height - 120
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: blue,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 15,
        marginLeft: 15,
        margin: 10,
        textAlign: 'center',
    },
    titleLine: {
        fontSize: 16,
        margin: 20,
        color: blue,
        textAlign: 'left',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 15,
        marginLeft: 15,
    },
    quizLine: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        color: blue,
        textAlign: 'left',
    },
    timeText: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        color: blue,
        textAlign: 'left',
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