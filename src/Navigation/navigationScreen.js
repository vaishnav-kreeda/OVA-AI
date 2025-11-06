import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import Signupscreen from '../screens/signupScreen/signUpScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signupscreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;


