import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';

const RightArrow = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32">
    <Path
      d="M16 0C7.178 0 0 7.178 0 16s7.178 16 16 16 16-7.178 16-16S24.822 0 16 0zm5.877 17.028l-7.758 7.758a1.45 1.45 0 01-1.028.426 1.455 1.455 0 01-1.028-2.483l6.729-6.73-6.73-6.728a1.455 1.455 0 012.058-2.057l7.757 7.757a1.454 1.454 0 010 2.057z"
      fill="#fff"
    />
  </Svg>
);

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Image
        source={require('../assets/voiceIcon.gif')}
        className="w-full h-[60%]"
      />
      <Text className="text-white text-4xl text-center font-bold">
        Meet <Text className="text-[#8D1BF3]">OvaDrive -</Text>
      </Text>
      <Text className="text-white text-4xl text-center font-bold">
        Your Personal AI Voice Assistant
      </Text>
      <Pressable
        className="w-[80%] flex flex-row border border-white rounded-full mt-10 justify-center items-center"
        onPress={() => navigation.navigate('Home')}
        style={({pressed}) => pressed && {opacity: 0.5}}>
        <Text className="text-white text-2xl text-center font-bold p-2">
          Let's get start
        </Text>
        <View className="ml-1">
          <RightArrow />
        </View>
      </Pressable>
    </View>
  );
};

export default IntroScreen;
