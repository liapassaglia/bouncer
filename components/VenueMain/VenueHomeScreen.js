import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, Text, View, Image, ImageBackground, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import HomeCard from './HomeCard'
import { Icon } from 'react-native-elements'

import {firebase} from '../../firebase';
import { connect } from 'react-redux'
import { AuthErrorCodes } from 'firebase/auth';

function VenueHomeScreen(props)  {
    const {currentVenue, lines} = props;
    const [lineInfo, setLineInfo] = useState({});
    const [number, onChangeNumber] = useState(null);

    useEffect (() => {
        var index = lines.findIndex(f => f.venueID == currentVenue.venueID)
        if (index != -1){
            setLineInfo(lines[index])
        }
    })

    const openLine = () => {
        firebase.firestore()
        .collection("lines")
        .doc(currentVenue.venueID)
        .set({})

        firebase.firestore()
        .collection("venues")
        .doc(currentVenue.venueID)
        .update({
            lineOpen: true,
        })

        var index = lines.findIndex(f => f.venueID == currentVenue.venueID)
        if (index != -1){
            setLineInfo(lines[index])
        }

        console.log(lines)
    }

    const letInLine = () => {
        if (number > lineInfo.size){
            Alert.alert(
                "Invalid Input",
                "You let in more people than are currently in line",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            return
        }
        firebase.firestore().collection('lines')
        .doc(firebase.auth().currentUser.uid)
        .collection('lineUsers')
        .orderBy("time","asc")
        .limit(1)
        .get()
        .then(snapshot => {
            let id = snapshot.docs[0].id
                firebase.firestore()
                .collection('users')
                .doc(id)
                .update({
                    letIn: true,
                })
                firebase.firestore()
                .collection('lines')
                .doc(currentVenue.venueID)
                .collection('lineUsers')
                .doc(id)
                .delete()
        })
        onChangeNumber(null)
    }

    if(currentVenue.lineOpen){
        
            return (
                <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
                <SafeAreaView style={{flex:1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                                style={styles.logo}
                                source={require('../../assets/bouncer-logo.png')}
                            />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity style={{marginRight: 20}} onPress={() => props.navigation.navigate('Settings')}>
                            <Icon
                                name='gear'
                                type='font-awesome'
                                color='#9CA4BE'
                                size="35px"
                            />
                        </TouchableOpacity>
                    </View>
                    <HomeCard 
                        venueID={currentVenue.venueID}
                        venueName={currentVenue.venueName}
                        imageUrl={currentVenue.imageURL}
                    >
                    </HomeCard>
                    <View style={{flex: 1}}>
                    <ImageBackground
                        style={styles.backgroundImage}
                        source={require('../../assets/home.png')}
                        imageStyle= {{opacity:0.3,width:400,height:400,marginLeft:55}}
                    >
                    <Text style={styles.text}>PEOPLE IN {"\n"}LINE:</Text>
                    <Text style={styles.spot}>{lineInfo.size}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity style = {styles.enterButton} onPress={() => letInLine()}> 
                        
                                <Text style= {styles.buttonText}>LET IN</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
            </KeyboardAvoidingView>
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
                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity style={{marginRight: 20}} onPress={() => props.navigation.navigate('Settings')}>
                            <Icon
                                name='gear'
                                type='font-awesome'
                                color='#9CA4BE'
                                size="35px"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{uri:currentVenue.imageURL}}></Image>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}
                                adjustsFontSizeToFit={true}
                                numberOfLines={2}
                                >{currentVenue.venueName}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity style = {styles.button} onPress={() => openLine()}> 
                                <Text style= {styles.buttonText}>Open Line</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (store) => ({
    currentVenue: store.userState.currentVenue,
    lines: store.userState.lines,
})

export default connect(mapStateToProps,null)(VenueHomeScreen);

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
        marginLeft: 50, 
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
        color: "#ffffff",
        fontSize: 23,
        textAlign: 'center',
        marginRight: 20,
        
    },
    backgroundImage: {
        // width: 500,
        // height: 500,
    },

    inputNumber: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 15,
        marginLeft: 12,
        borderColor: '#9CA4BE',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: '50%'
    },

    cardContainer: {
        margin: 10,
        marginTop: 30,
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
        textTransform: 'uppercase',
      },
      button: {
        width: 150,
        borderWidth: 3,
        borderColor: '#78C954',
        borderRadius: 5,
        padding: 7,
      },
      buttonText: {
        color: '#78C954',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
      },
      enterButton: {
        width: 150,
        borderWidth: 3,
        borderColor: '#78C954',
        borderRadius: 5,
        padding: 7,
        height: 40,
        marginTop: 15,
        justifyContent: 'center'
      }
})