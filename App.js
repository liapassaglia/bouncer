import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))


import Login from './components/auth/Login'
import UserRegister from './components/auth/UserRegister'
import VenueRegister from './components/auth/VenueRegister';
import AppMain from './components/AppMain'
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const {loaded, loggedIn} = this.state;
    if (!loaded) {
      return (
        <View><Text>Loading...</Text></View>
      )
    } 
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator 
          initialRouteName='Login'
          screenOptions={{
            headerShown: false
          }}
          >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="UserRegister" component={UserRegister}/>
            <Stack.Screen name="VenueRegister" component={VenueRegister}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppMain/>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
