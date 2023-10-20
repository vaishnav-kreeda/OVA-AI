import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from './src/screens/IntroScreen';
import HomeScreen from './src/screens/HomeScreen';

const Intro = () => {
  return (
    <View className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <Text className="text-3xl font-bold text-white">Hello World</Text>
    </View>
  );
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1700);
  });

  const Stack = createNativeStackNavigator();

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require('./src/assets/darkIcon.jpeg')}
      backgroundColor={'#000'}
      logoHeight={150}
      logoWidth={150}>
      <>
        {/* <StatusBar style="light" /> */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </AnimatedSplash>
  );
};

export default App;
