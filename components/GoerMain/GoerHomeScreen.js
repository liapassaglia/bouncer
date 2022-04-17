import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Image, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import HomeCard from './HomeCard'

import {firebase} from '../../firebase';
import { connect } from 'react-redux'

function GoerHomeScreen(props)  {
    const {currentUser, lineInfo} = props;
    const [accepted, setAccepted] = useState(false);

    console.log(props.lineInfo)
    const denied = () => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
            line: firebase.firestore.FieldValue.delete(),
            letIn: firebase.firestore.FieldValue.delete()
        })
    }

    const onDeny = () => {
        Alert.alert(
            "Deny Entry Ticket",
            "Are you sure you want to deny your entry ticket?",
            [
              {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
              },
              { text: "OK", onPress: () => denied() }
            ]
          );
    }

    const onAccept = () => {

    }
    if (currentUser.letIn){
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                                style={styles.logo}
                                source={require('../../assets/bouncer-logo.png')}
                            />
                    </View>
                    <View><Text style={styles.text}>YOU'RE IN!</Text></View>
                    <View style={styles.cardContainer}>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{uri:props.lineInfo.imageURL}}></Image>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}
                                adjustsFontSizeToFit={true}
                                numberOfLines={2}
                                >{props.lineInfo.venueName}</Text>
                            </View>
                        </View>
                        { accepted ? 
                            (<View style={{flexDirection:'row', justifyContent:'center'}}>
                                <Text>Accepted!</Text>
                            </View>) : (
                            <View style={{flexDirection:'row', justifyContent:'center'}}>
                                <TouchableOpacity style = {styles.buttonDeny}  onPress={() => onDeny()}> 
                                    <Text style= {styles.buttonTextDeny}>Deny</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.buttonAccept}> 
                                    <Text style= {styles.buttonTextAccept}>Accept</Text>
                                </TouchableOpacity>
                            </View>)
                            }
                    </View>
                </View>
            </SafeAreaView>
        )
    } else if(props.lineInfo.spot){
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
                    venueID={props.lineInfo.venueID}
                    venueName={props.lineInfo.venueName}
                    imageUrl={props.lineInfo.imageURL}
                >
                </HomeCard>
                <View style={{flex: 1}}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../../assets/home.png')}
                    imageStyle= {{opacity:0.3,width:400,height:400,marginLeft:55}}
                >
                <Text style={styles.textSpot}>SPOT IN {"\n"}LINE:</Text>
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
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
        marginTop: 15,
    },
    textSpot: {
        color: 'white',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginTop: 15,
        marginLeft: 30,
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

    cardContainer: {
        margin: 10,
        marginTop: 20,
        borderWidth: 3,
        borderColor: '#9CA4BE',
        borderRadius: 6,
        height: 400,
        backgroundColor: '#000824',
        justifyContent: 'center'
      },
      imageContainer: {
        flexDirection: 'row',
        width: 300,
        height: 200,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
      },
      waitTime: {
        flexDirection: 'row',
        marginLeft: 10,
      },
      info: {
        color: '#9CA4BE',
        fontSize: 18,
        fontWeight: 'bold',
      },
      image: {
        flex: 1,
        width: undefined, 
        height: undefined,
        resizeMode: 'contain',
      },
      textContainer: {
        flexDirection: 'row',
        width: '75%',
        height: 75,
        padding: 2,
        justifyContent: 'center',
      },
      title: {
        color: "#FFFFFF",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 45,
        fontWeight: 'bold',
      },
      buttonDeny: {
        width: 150,
        borderWidth: 3,
        borderColor: '#FF5151',
        borderRadius: 5,
        padding: 7,
        margin: 5,
      },
      buttonTextDeny: {
        color: '#FF5151',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
      },
      buttonAccept: {
        width: 150,
        borderWidth: 3,
        borderColor: '#78C954',
        borderRadius: 5,
        padding: 7,
        margin: 5,
      },
      buttonTextAccept: {
        color: '#78C954',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
      },
})