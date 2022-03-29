import React from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { useFirebaseAuth } from '../../firebaseAuthContext'
import styles from './styles';
import Card from '../../components/Card'
import { TabItem } from '@react-native-elements/base/dist/Tab/Tab.Item';

const VENUE_DATA = [
    {
        venueName: "ROWDIES",
        numberInLine: 15,
        waitTime: 30,
        imageUrl: "https://myareanetwork-photos.s3.amazonaws.com/bizlist_photos/cover/244898_1498148536.png"
    },
    {
        venueName: "SALTY DOG SALOON",
        numberInLine: 2,
        waitTime: 10,
        imageUrl: "https://lh3.googleusercontent.com/fNlfR27CeNWPi8gHTZduTj4dU-z-HjEyEZISe2vvoAwHe1BRpKekcxSh2MDbj5pH97QRarWlFKxndgRXCaqoXfS_kwVasFAapjMfOuZy=s340"
    },
    {
        venueName: "SOCIAL",
        numberInLine: 0,
        waitTime: 0,
        imageUrl: "https://thesocialgnv.com/wp-content/uploads/2016/10/logo.png"
    }
]

export default function GoerHomeScreen() {
    const user = useFirebaseAuth();
    console.log(user);
    return (
        <SafeAreaView style={{flex:1}}>
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


            >
            </Card>

            <Text style={styles.text}>SPOT IN {"\n"} LINE: </Text>
            <Text style={styles.eta}>ETA:  </Text>
            <Text style={styles.lineSize}>LINE SIZE:  </Text>
            <Text style={styles.movement}>MOVEMENT:  </Text>



            

        </View>
        </SafeAreaView>
    )
}