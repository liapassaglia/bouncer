import React from 'react'
import { Text, View } from 'react-native'
import { useFirebaseAuth } from '../../firebaseAuthContext'
import styles from './styles';
import SampleCard from '../../components/sampleCard'



export default function GoerHomeScreen() {
    const user = useFirebaseAuth();
    console.log(user);
    return (
        <View>
            <SampleCard barName="ROWDIES"></SampleCard>
        </View>
    )
}