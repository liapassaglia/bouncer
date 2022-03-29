import React, { useState } from 'react'
import { FlatList, Image, Text, View, SafeAreaView } from 'react-native'
import styles from './styles';
import Card from '../../components/Card'

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

export default function FavoriteScreen(props) {

    const [data, setData] = useState(VENUE_DATA);

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.header}>

                <Image
                        style={styles.logo}
                        source={require('../../assets/bouncer-logo.png')}
                    />
            </View>

            <Text style={styles.edit}>Edit</Text>

            <Text style={styles.text}>FAVORITES</Text>

      
            <FlatList
                    data={data}
                    renderItem={({item})=>(
                        <Card 
                            venueName={item.venueName}
                            numberInLine={item.numberInLine}
                            waitTime={item.waitTime}
                            imageUrl={item.imageUrl}
                        ></Card>
                    )}
                    keyExtractor={item=>item.venueName}
            />
        </View>
        </SafeAreaView>
    )
}