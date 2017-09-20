import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { blue } from '../utils/colors'
import { Entypo } from '@expo/vector-icons'

export default function ImageButton({ children, onPress, imageName, style = {} }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.innerContainer}  >
                    <Entypo style={styles.image} name={imageName} size={30} color={blue} />
                    <Text style={[styles.btnText, style]}>{children}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText: {
        textAlign: 'center',
        color: blue,
        marginLeft: 10,
        fontWeight : 'bold',
        marginRight : 30,
    },
    image: {
        marginLeft: 10,
    },
    container: {
        height: 54,
        margin: 10,
        alignItems : 'center',
        justifyContent : 'flex-start',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 6,
        borderColor: blue,
        height: 44,
        width : 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
})