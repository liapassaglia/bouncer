import React from 'react'
import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles';

const user = {
    name: 'Nicolas Adams',
    email: 'nicolasadams@gmail.com',
    password: '12345',
}

export default function SettingsScreen(props) {
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
            <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.infoView}>
            <Text style={styles.email}>{user.email}</Text>
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
            <TouchableOpacity style = {styles.button}> 
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