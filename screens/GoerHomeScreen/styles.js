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
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginLeft: 15, 
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderTopWidth:20,
        borderBottomWidth:20

    },
    eta: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 15,
        marginLeft: 15, 
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderTopWidth:20,
        borderBottomWidth:20
        
    },
    lineSize: {
        color: "#9ca4be",
        fontSize: 20,
        textAlign: 'left',
        marginRight: 20,
        marginLeft:30
        
    },
    movement: {
        color: "#9ca4be",
        fontSize: 20,
        textAlign: 'right',
        marginRight: 30,
        marginTop: -32,
        
    }
})