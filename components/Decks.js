import React, { Component } from 'react'
import { View, FlatList, Alert, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, blue, gray } from '../utils/colors'
import { fetchDecks } from '../utils/apis'
import { loadedDecks, addDeck, addExampleDecks } from '../actions'
import { AppLoading } from 'expo'
import ImageButton from './ImageButton'
import { NavigationActions } from 'react-navigation'
import Deck from './Deck.js'

class Decks extends Component {
    state = {
        ready: false,
    }

    constructor(props) {
        super(props);
        console.log(props);
        console.log("create decks")

        this.addNewDeck = this.addNewDeck.bind(this);
        this.addExampleDeck = this.addExampleDeck.bind(this);

    }

    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks()
            .then((decks) => dispatch(loadedDecks(decks)))
            .then(({ decks }) => {
            })
            .then(() => this.setState(() => ({ ready: true })))
    }

    addNewDeck() {
        this.props.navigation.navigate('NewDeck');
    }

    addExampleDeck() {
        Alert.alert(
            'UdaciCards',
            "Please press 'OK' to add example deck",
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        this.props.dispatch(addExampleDecks());
                    }
                },
            ],
            { cancelable: false }
        )
    }

    renderNoDecksView() {
        return (
            <View style={styles.containerNoDeck}>
                <Text style={styles.appNoDecks}>Hi! There are no quiz decks created yet.</Text>
                <View style={{ height: 20 }} />
                <Text style={styles.appNoDecks}>Please press a button below to get started.</Text>
                <View style={{ height: 20 }} />
                <ImageButton style={{ padding: 10 }} imageName='add-to-list' onPress={() => { this.addNewDeck() }}>
                    Create New Deck
                </ImageButton>
                <ImageButton style={{ padding: 10 }} imageName='menu' onPress={this.addExampleDeck}>
                    Add Example Decks
                </ImageButton>
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

        for (let deckName in decks) {
            let deck = decks[deckName];
            deck.key = deckName;
            arrayOfDecks.push(deck);
        }

        if (arrayOfDecks.length === 0) {
            return this.renderNoDecksView();
        }

        return (
            <View style={styles.container}>
                <FlatList style={{flex:1}}
                    data={arrayOfDecks}
                    renderItem={( item ) => {
                        return (
                            <Deck  key={item.index} dispatch={this.props.dispatch} deck={item.item}/>
                        )
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',
    },
    containerNoDeck: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding : 20,
    },
    appNoDecks: {
        color: blue,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '90%',
    }
})

function mapStateToProps(decks) {
    return {
        decks: decks.decks
    }
}

export default connect(
    mapStateToProps,
)(Decks)