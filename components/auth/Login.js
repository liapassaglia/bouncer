import React, { useState } from 'react'
import { SafeAreaView, Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    const onLoginPress = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            //Signed in 
            const user = userCredential.user;
            console.log(userCredential);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require('../../assets/background-image.jpg')}
            />
            <Image
                style={styles.logo}
                source={require('../../assets/bouncer-logo.png')}
           />
            <View
                style={{ flex: 1, width: '100%', height: '100%'}}
                keyboardShouldPersistTaps="always">
                <Text style={styles.text}>NEVER STAND IN-LINE AGAIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry='false'
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000824',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        opacity: 0.05
    },
    logo: {
        flex: 1,
        height: 300,
        width: 300,
        alignSelf: "center",
        margin: 30
    },
    text: {
        fontSize: 18,
        color: '#9CA4BE',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: -80, 
        marginBottom: 25
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: 'white',
        borderBottomWidth: 3,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16, 
        color: 'white',
    },
    button: {
        borderColor: '#78C954',
        borderWidth: 3,
        marginLeft: 75,
        marginRight: 75,
        marginTop: 20,
        height: 48,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonTitle: {
        color: '#78C954',
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
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
})