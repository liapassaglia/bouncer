import 'react-native-gesture-handler';
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen, GoerHomeScreen, RegistrationScreen, FavoritesScreen, ExploreScreen, SettingsScreen } from './screens'
import { FirebaseAuthProvider, useFirebaseAuth } from './firebaseAuthContext';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const AuthContext = React.createContext();

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
    headerShown: false
  }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen}/>
    <AuthStack.Screen name="Registration" component={RegistrationScreen} />
  </AuthStack.Navigator>
);

const GoerTabs = createBottomTabNavigator();
const GoerTabsScreen = (user) => (
  <GoerTabs.Navigator>
    <GoerTabs.Screen
      name="Home"
      component={GoerHomeScreen}
    />
    <GoerTabs.Screen
      name="Favorites"
      component={FavoritesScreen}
    />
    <GoerTabs.Screen
      name="Explore"
      component={ExploreScreen}
    />
    <GoerTabs.Screen
      name="Settings"
      component={SettingsScreen}
    />
  </GoerTabs.Navigator>
);

function Navigator() {
  const user = useFirebaseAuth();
  return (
  //   user == null ? (<AuthStackScreen/>)
  //   :
  //   (<GoerTabsScreen/>)
  // )
  <GoerTabsScreen/>
  )
  }


export default function App({ navigation }) {
  return (
    <FirebaseAuthProvider>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </FirebaseAuthProvider>
  );
}