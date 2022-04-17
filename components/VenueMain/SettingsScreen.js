import React, {Component, useState} from 'react'
import {Modal,SafeAreaView, Image, Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'
import {getAuth, signOut} from 'firebase/auth';

import { connect } from 'react-redux'
import {clearData} from '../../redux/action/index'
import { bindActionCreators } from 'redux'
import {VenueRegister} from '../auth/VenueRegister'
import { firebase } from '../../firebase';
  

function VenueSettingsScreen(props) {
    const {currentVenue} = props;
    const [modalVisible, setModalVisible] = useState(false);
    const venueName = VenueRegister.venueName;
    const [newName, setNewName] = useState(venueName);

    const editName = () => {
        firebase.firestore()
        .collection("venues")
        .doc(currentVenue.venueID)
        .update({
            venueName: newName,
        })
        setModalVisible(!modalVisible)
    }

    const onLogOutPress = () => {
        props.clearData();
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
        return (

            <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/bouncer-logo.png')}
                />
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                <TouchableOpacity style={{marginLeft: 20}} onPress={() => props.navigation.navigate('Home')}>
                    <Icon
                        name='arrow-left'
                        type='font-awesome'
                        color='#9CA4BE'
                        size="30px"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.profileImageView}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/profile.png')}
                />
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TextInput
                        style={styles.input}
                        placeholder='Venue Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(newName) => setNewName(newName)}
                        value={newName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={() => editName()}
                >
                <Text style={styles.textStyle}>Exit</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
            <View style={styles.infoView}>
                <Text style={styles.name}>{currentVenue.venueName}</Text>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.email}>{currentVenue.email}</Text>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => setModalVisible(true)}
                > 
                    <Icon name='user'
                    type='font-awesome'
                    color='white'/>
                    <Text style= {styles.buttonText}>Edit Name</Text>
                    <View style={{position: 'absolute',right: 10,top:7.5}}>
                    <Icon name='angle-right'
                    type='font-awesome'
                    color='white'
                    />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}
                onPress={() => onLogOutPress()}>
                    <Icon name='logout'
                    type='material'
                    color='white'/>
                    <Text style= {styles.buttonText}>Log Out</Text>
                    <View style={{position: 'absolute',right: 10,top:7.5}}>
                    <Icon name='angle-right'
                    type='font-awesome'
                    color='white'
                    />
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    )
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentVenue: store.userState.currentVenue,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({clearData},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(VenueSettingsScreen);

const styles =  StyleSheet.create({
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
        color: '#ffffff'
    },
    profileImage: {
        width: 125,
        height: 125,
    },
    profileImageView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    infoView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    }, 
    name: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
        textTransform: 'uppercase',
    },
    email: {
        color: '#9CA4BE',
        fontSize: 16,
        marginTop: 5,
    },
    buttonsView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 40
    }, 
    button: {
        width: 250,
        height: 50,
        borderWidth: 3,
        borderColor: '#9CA4BE',
        borderRadius: 5,
        padding: 7,
        flexDirection: 'row',
        position: 'relative',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        marginLeft: 15,
        marginTop: 3
    },



    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 130,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      modalButtonOpen: {
        backgroundColor: "#F194FF",
      },
      modalButtonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})