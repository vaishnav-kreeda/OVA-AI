import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import RootNavigator from './src/Navigation/navigationScreen';

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
        <RootNavigator />
      </>
    </AnimatedSplash>
  );
};

export default App;
