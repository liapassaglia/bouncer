import React, {Component, useEffect} from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View, LogBox, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {clearData, fetchUser, fetchVenue, fetchFavorites, fetchVenues, fetchLineInfo, fetchLines } from '../redux/action/index'

import GoerHomeScreen from './GoerMain/GoerHomeScreen'
import ExploreScreen from './GoerMain/ExploreScreen'
import FavoritesScreen from './GoerMain/FavoritesScreen'
import SettingsScreen from './GoerMain/SettingsScreen'
import VenueHomeScreen from './VenueMain/VenueHomeScreen'
import VenueSettingsScreen from './VenueMain/SettingsScreen'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export class AppMain extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchVenue();
        this.props.fetchFavorites();
        this.props.fetchVenues();
        this.props.fetchLineInfo();
        this.props.fetchLines();
    }


    
    // useEffect(){
    //     this.props.reload();
    // }

    render() {
        if (this.props.currentUser){
        return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home'
                } else if (route.name === 'Favorites') {
                    iconName = 'heart'
                }
                else if (route.name === 'Explore') {
                    iconName = 'search'
                }
                else if (route.name === 'Settings') {
                    iconName = 'user'
                }
                return <Icon name={iconName}
                type='font-awesome'
                color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#9CA4BE',
                tabBarStyle: {
                backgroundColor: '#000824',
                }
            })}
        >
                <Tab.Screen
                name="Home"
                component={GoerHomeScreen}
                />
                <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                />
                <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                />
                <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                />
            </Tab.Navigator>
        )
    }
    else if (this.props.currentVenue) {
        return(
            <Stack.Navigator 
            screenOptions={{
              headerShown: false
            }}
            >
              <Stack.Screen name="Home" component={VenueHomeScreen}/>
              <Stack.Screen name="Settings" component={VenueSettingsScreen}/>
            </Stack.Navigator>
        )
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                        style={styles.logo}
                        source={require('../assets/bouncer-logo.png')}
                    />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around',padding:10}}>
              <ActivityIndicator size="large" color="#fffff" />
            </View>
        </View>
        </SafeAreaView>
    )
}
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentVenue: store.userState.currentVenue,
    favorites: store.userState.favorites,
    venues: store.userState.venues,
    lineInfo: store.userState.lineInfo,
    lines: store.userState.lines
})
const mapDispatchToProps = (dispatch) => bindActionCreators({clearData, fetchUser, fetchVenue, fetchFavorites, fetchVenues, fetchLineInfo, fetchLines},dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AppMain)

const styles = StyleSheet.create({
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
  });