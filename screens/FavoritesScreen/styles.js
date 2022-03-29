import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginLeft: 15
    },

    edit:{
        color: "#9ca4be",
        fontSize: 20,
        textAlign: 'right',
        marginRight: 20
    }
})