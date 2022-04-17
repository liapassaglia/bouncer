import React, {Component} from 'react'
import { SafeAreaView, Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'
import {connect} from 'react-redux'
import {getAuth, signOut} from 'firebase/auth';

import {clearData} from '../../redux/action/index'
import { bindActionCreators } from 'redux'

function SettingsScreen(props) {
    const {currentUser} = props;


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
                <TouchableOpacity style = {styles.button}> 
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
})