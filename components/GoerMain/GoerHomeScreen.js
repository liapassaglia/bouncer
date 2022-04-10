import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Image, ImageBackground, StyleSheet } from 'react-native'
import HomeCard from './HomeCard'

import {firebase} from '../../firebase';
import { connect } from 'react-redux'

function GoerHomeScreen(props)  {
    const {currentUser, lineInfo} = props;
    const [venue, setVenue] = useState({});
     useEffect(() => {
        if(lineInfo.venueID){
            firebase.firestore()
            .collection('venues')
            .doc(lineInfo.venueID)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    setVenue(snapshot.data())
                } else {
                    console.log('does not exist')
                }
        })
        }
    });
    if(lineInfo.spot){
            return (
                <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                                style={styles.logo}
                                source={require('../../assets/bouncer-logo.png')}
                            />
                    </View>
                    <HomeCard 
                        venueID={venue.venueID}
                        venueName={venue.venueName}
                        imageUrl={venue.imageURL}
                    >
                    </HomeCard>
                    <View style={{flex: 1}}>
                    <ImageBackground
                        style={styles.backgroundImage}
                        source={require('../../assets/home.png')}
                        imageStyle= {{opacity:0.3,width:400,height:400,marginLeft:55}}
                    >
                    <Text style={styles.text}>SPOT IN {"\n"}LINE:</Text>
                    <Text style={styles.spot}>{lineInfo.spot}</Text>
                    <Text style={styles.lineSize}>Line Size: {lineInfo.numberInLine} people</Text>
                    </ImageBackground>
                    </View>
                </View>
                </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                                style={styles.logo}
                                source={require('../../assets/bouncer-logo.png')}
                            />
                    </View>
                    <View style={{flex: 1}}>
                    <ImageBackground
                        style={styles.backgroundImage}
                        source={require('../../assets/home.png')}
                        imageStyle= {{opacity:0.3,width:400,height:400,marginLeft:55}}
                    >
                    <Text style={styles.text}>JOIN A LINE!</Text>
                    </ImageBackground>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    lineInfo: store.userState.lineInfo,
})

export default connect(mapStateToProps,null)(GoerHomeScreen);

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
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    text: {
        color: 'white',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginTop: 35,
        marginBottom: 20,
        marginLeft: 45, 
    },
    spot: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 75,
        fontWeight: '600',
        marginTop: -30,
        marginBottom: 45,
    },
    lineSize: {
        color: "#9ca4be",
        fontSize: 23,
        textAlign: 'center',
        marginRight: 20,
        
    },
    backgroundImage: {
        // width: 500,
        // height: 500,
    },
})