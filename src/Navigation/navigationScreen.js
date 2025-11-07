import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getApp} from '@react-native-firebase/app';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import Signupscreen from '../screens/signupScreen/signUpScreen';

const Stack = createNativeStackNavigator();

// Unauthenticated Stack (Login, Signup, Intro)
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Intro" component={IntroScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={Signupscreen} />
  </Stack.Navigator>
);

// Authenticated Stack (Home only - no back navigation to login)
const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false, // Disable swipe back gesture
    }}>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        headerLeft: null, // Remove back button
      }}
    />
  </Stack.Navigator>
);

export const RootNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // You can return a loading screen here if needed
    return null;
  }

  return (
    <NavigationContainer key={user ? 'authenticated' : 'unauthenticated'}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;


