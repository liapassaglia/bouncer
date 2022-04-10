import React, {Component, useEffect, useState} from 'react'
import { FlatList, Image, Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Card from './Card'
import { connect } from 'react-redux'

function FavoritesScreen(props) {
        const {favorites} = props;

        return (
            <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.header}>
    
                    <Image
                            style={styles.logo}
                            source={require('../../assets/bouncer-logo.png')}
                        />
                </View>   
                <Text style={styles.text}>FAVORITES</Text>      
                <FlatList
                        data={favorites}
                        renderItem={({item})=>(
                            <Card 
                                venueID={item.venueID}
                                venueName={item.venueName}
                                venueOpen={item.open}
                                numberInLine={item.size}
                                imageUrl={item.imageURL}
                                favorite={true}
                            ></Card>
                        )}
                        keyExtractor={item=>item.venueID}
                />
            </View>
            </SafeAreaView>
    )
}
const mapStateToProps = (store) => ({
    favorites: store.userState.favorites
})

export default connect(mapStateToProps,null)(FavoritesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000824'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80,
    },
    text: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginLeft: 15
    },

    edit:{
        color: "#9ca4be",
        fontSize: 20,
        textAlign: 'right',
        marginRight: 20
    }
})