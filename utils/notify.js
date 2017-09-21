import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

// code example for notify 
// build via udacity example in section 4 on native functions
// https://github.com/udacity/reactnd-UdaciFitness-complete/tree/63778456f674355e40044c673f4b966ebd446866



function createNotification() {
    return {
        title: 'Take your daily quiz!',
        body: "🎈 Hey the day is almost over don't forget to take a quiz! 🎈",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {

    Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
            if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: tomorrow,
                        repeat: 'day',
                    }
                )
            }
        });
}