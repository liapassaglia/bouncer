import React from 'react'
import { Text, View } from 'react-native'
import { useFirebaseAuth } from '../../firebaseAuthContext'
import styles from './styles';



export default function GoerHomeScreen() {
    const user = useFirebaseAuth();
    console.log(user);
    return (
        <View>
            <Text>Welcome {user.displayName}</Text>
        </View>
    )
}