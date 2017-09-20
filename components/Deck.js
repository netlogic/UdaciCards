import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { white , blue } from '../utils/colors'

import { AppLoading } from 'expo'

class Deck extends Component {
    state = {
        ready: false,
    }

    render() {
        const numberOfQuestions = this.props.deck.questions.length;
        let questionText;

        if ( numberOfQuestions > 1 || numberOfQuestions === 0 ) {
            questionText = numberOfQuestions + " cards";
        } else {
            questionText = "1 card";
        }

        return (
            <View style={[styles.container,{width : Dimensions.get('window').width - 30 } ]}>
                <Text style={styles.firstLine}>{this.props.deck.title}</Text>
                <Text style={styles.secondLine}>{questionText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
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
        height : 200,
        marginTop : 10,
        marginBottom : 10,
    },
    firstLine : {
        fontWeight : 'bold',
        fontSize : 24,
        textAlign : 'center',
        color : blue,
    },
    secondLine : {
        fontSize : 18,
        textAlign : 'center',
        color : blue,
        marginTop : 15,
    }
})

export default Deck;
