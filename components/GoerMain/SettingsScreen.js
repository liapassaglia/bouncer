import React, {Component, useState} from 'react'
import {Modal, TextInput, SafeAreaView, Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'
import {connect} from 'react-redux'
import {getAuth, signOut} from 'firebase/auth';

import {clearData} from '../../redux/action/index'
import { bindActionCreators } from 'redux'
import {UserRegister} from '../auth/UserRegister'

function SettingsScreen(props) {
    const {currentUser} = props;
    const fullName = UserRegister.fullName;

    const [modalVisible, setModalVisible] = useState(false);

    const [newName, setNewName] = useState(fullName);


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
            <View style={styles.profileImageView}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/profile.png')}
                />
            </View>
            <View style={styles.infoView}>
                <Text style={styles.name}>{currentUser.fullName}</Text>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.email}>{currentUser.email}</Text>
            </View>
            <View style={styles.buttonsView}>
            <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => setModalVisible(true)}>                     
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
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(newName) => setNewName(newName)}
                    value={newName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />            
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}> 
                    <Icon name='lock'
                    type='font-awesome'
                    color='white'/>
                    <Text style= {styles.buttonText}>Edit Password</Text>
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
})

const mapDispatchToProps = (dispatch) => bindActionCreators({clearData},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen);

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

    //modal stuff
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 40,
        padding: 110,
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
        elevation: 2,
        marginTop: 10
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