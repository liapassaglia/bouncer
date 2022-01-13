import * as React from 'react';
import { Button, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GoerScr from './GoerApp/Screens/GoerScr';
import FavoritesScr from './GoerApp/Screens/FavoritesScr';
import ExploreScr from './GoerApp/Screens/ExploreScr';
import SettingsScr from './GoerApp/Screens/SettingsScr';

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function SignInScr() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Sign In" component={SignInScr} />
  </AuthStack.Navigator>
);

const GoerTabs = createBottomTabNavigator();
const GoerTabsScreen = () => (
  <GoerTabs.Navigator>
    <GoerTabs.Screen
      name="Home"
      component={GoerScr}
    />
    <GoerTabs.Screen
      name="Favorites"
      component={FavoritesScr}
    />
    <GoerTabs.Screen
      name="Explore"
      component={ExploreScr}
    />
    <GoerTabs.Screen
      name="Settings"
      component={SettingsScr}
    />
  </GoerTabs.Navigator>
);

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <SplashScreen />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <AuthStackScreen/>
          ) : (
            // User is signed in
            <GoerTabsScreen/>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}