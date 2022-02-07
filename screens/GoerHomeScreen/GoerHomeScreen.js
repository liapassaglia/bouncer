import React from 'react'
import { Text, View, Image } from 'react-native'
import { useFirebaseAuth } from '../../firebaseAuthContext'
import styles from './styles';
import Card from '../../components/Card'



export default function GoerHomeScreen() {
    const user = useFirebaseAuth();
    console.log(user);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                        style={styles.logo}
                        source={require('../../assets/bouncer-logo.png')}
                    />
            </View>
            <Card 
                venueName="ROWDIES"
                numberInLine={15}
                waitTime={30}
                imageUrl="https://myareanetwork-photos.s3.amazonaws.com/bizlist_photos/cover/244898_1498148536.png"
            ></Card>
            <Card 
                venueName="SALTY DOG SALOON"
                numberInLine={2}
                waitTime={10}
                imageUrl="https://lh3.googleusercontent.com/fNlfR27CeNWPi8gHTZduTj4dU-z-HjEyEZISe2vvoAwHe1BRpKekcxSh2MDbj5pH97QRarWlFKxndgRXCaqoXfS_kwVasFAapjMfOuZy=s340"
            ></Card>
        </View>
    )
}