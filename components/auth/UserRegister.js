import React, { useState, Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from '../../firebase';

export class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }   
        this.onSignUp= this.onSignUp.bind(this)
    }

    onSignUp = async() => {
        const {fullName, email, password, confirmPassword} = this.state;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            // Signed In
            const data = {
                uid: userCredential.user.uid,
                email: email,
                fullName: fullName,
            };
            console.log(userCredential);
            // Firestore
            firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set(data)
            .then(() => {
                const user = firebase.auth().currentUser;
                console.log(user);
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
    const {fullName, email, password, confirmPassword} = this.state;
    return (
        <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/bouncer-logo.png')}
                />
                <Text style={styles.text}>USER SIGN UP</Text>  
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(fullName) => this.setState({fullName})}
                    value={fullName}
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(confirmPassword)=> this.setState({confirmPassword})}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
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

export default UserRegister

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#000824',
    },
    title: {

    },
    text: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginLeft: 15
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
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