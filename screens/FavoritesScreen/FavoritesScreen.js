import React from 'react'
import { SafeAreaView, Image, Text, View } from 'react-native'
import styles from './styles';

export default function FavoritesScreen(props) {
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                        style={styles.logo}
                        source={require('../../assets/bouncer-logo.png')}
                    />
            </View>
            <Text style={styles.text}>Favorites</Text>
        </View>
        </SafeAreaView>
    )
}