import React, {Component} from 'react'
import {View, Text} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser, fetchFavorites, fetchVenues, fetchLineInfo, fetchLines} from '../redux/action/index'

import GoerHomeScreen from './GoerMain/GoerHomeScreen'
import ExploreScreen from './GoerMain/ExploreScreen'
import FavoritesScreen from './GoerMain/FavoritesScreen'
import {SettingsScreen} from './GoerMain/SettingsScreen'
const Tab = createBottomTabNavigator();

export class GoerMain extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchFavorites();
        this.props.fetchVenues();
        this.props.fetchLineInfo();
        this.props.fetchLines();
    }

    render() {
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
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    favorites: store.userState.favorites,
    venues: store.userState.venues,
    lineInfo: store.userState.lineInfo,
    lines: store.userState.lines
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchFavorites, fetchVenues, fetchLineInfo, fetchLines},dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(GoerMain)