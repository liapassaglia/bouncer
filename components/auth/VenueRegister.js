import React, { useState, Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from '../../firebase';
import {KeyboardAvoidingView} from 'react-native';

export class VenueRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venueName: '',
            email: '',
            password: '',
            confirmPassword: '',
            imageURL: '',
        }   
        this.onSignUp= this.onSignUp.bind(this)
    }

    onSignUp = async() => {
        const {venueName, email, password, confirmPassword, imageURL} = this.state;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            // Signed In
            const data = {
                venueID: userCredential.user.uid,
                venueName: venueName,
                email: email,
            };
            // Firestore
            firebase.firestore()
            .collection("venues")
            .doc(firebase.auth().currentUser.uid)
            .set(data)
            .then(() => {
                const user = firebase.auth().currentUser
                console.log(user)
            })
            .catch((error) => {
                alert(error)
            });
        })
        .catch ((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    render() {
    const {venueName, email, password, confirmPassword, imageURL} = this.state;
    return (
        <View  style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/bouncer-logo.png')}
                />
                <Text style={styles.text}>VENUE SIGN UP</Text>  
                <TextInput
                    style={styles.input}
                    placeholder='Venue Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(venueName) => this.setState({venueName})}
                    value={venueName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(email) => this.setState({email})}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(password)=> this.setState({password})}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Image URL'
                    onChangeText={(imageURL)=> this.setState({imageURL})}
                    value={imageURL}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                </KeyboardAvoidingView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onSignUp()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={() => this.props.navigation.navigate("Login")} style={styles.footerLink}>Log in</Text></Text>
                </View>
        </View>
    )}
}

export default VenueRegister

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#000824',
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },text: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginLeft: 15
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
        paddingLeft: 16,
        width: '75%'
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        width: '50%'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#9CA4BE'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})