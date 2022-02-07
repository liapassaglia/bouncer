import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles';

export default function ExploreScreen(props) {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Image
                    style={styles.logo}
                    source={require('../../assets/bouncer-logo.png')}
                />
        </View>
        <Text style={styles.text}>Explore</Text>
    </View>
    )
}