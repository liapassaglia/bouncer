import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default StyleSheet.create({
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