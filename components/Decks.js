import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { fetchDecks } from '../utils/apis'
import { loadedDecks, addDeck } from '../actions'
import { AppLoading } from 'expo'

class Decks extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;


        fetchDecks()
            .then((decks) => dispatch(loadedDecks(decks)))
            .then(({ decks }) => {
            })
            .then(() => this.setState(() => ({ ready: true })))
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <Text>Decks</Text>
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
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps,
)(Decks)