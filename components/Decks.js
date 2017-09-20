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

    renderNoDecksView() {
        return (
            <View style={styles.container}>
                <Text>There are no quiz decks created yet</Text>
                <Text>Create New Deck</Text>
                <Text>Add a default deck</Text>
            </View>
        )
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        let arrayOfDecks = [];

        for ( deck in decks ) {
            arrayOfDecks.push( deck );
        }

        if ( arrayOfDecks.length === 0 ) {
            return this.renderNoDecksView();
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
        decks : decks.decks 
    }
}

export default connect(
    mapStateToProps,
)(Decks)