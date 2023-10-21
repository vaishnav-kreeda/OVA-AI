import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-community/voice';
import {openAi} from '../api/openAi';
import Tts from 'react-native-tts';

const HomeScreen = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechStartHandler = e => {};

  const speechEndHandler = e => {
    setIsSpeaking(false);
    setIsMicOn(false);
  };

  const speechResultsHandler = e => {
    getAiResponse(e.value[0]);
  };

  const speechErrorHandler = e => {
    setIsMicOn(false);
  };

  const startRecording = async () => {
    Tts.stop();
    setIsSpeaking(false);
    try {
      setIsMicOn(true);
      await Voice.start('en-US');
    } catch (e) {
      setIsMicOn(false);
      ToastAndroid.showWithGravity(
        'Something went wrong, please try again',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const stopRecording = async () => {
    try {
      setIsMicOn(false);
      await Voice.stop();
    } catch (e) {
      ToastAndroid.showWithGravity(
        'Something went wrong, please try again',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({animated: true, behavior: 'smooth'});
    }, 1000);
  };

  const getAiResponse = result => {
    if (result.trim().length > 0) {
      setMessages(prevMessages => {
        let newMessages = [
          ...prevMessages,
          {role: 'user', content: result.trim()},
        ];
        scrollToBottom();
        openAi(result.trim(), newMessages).then(res => {
          if (res.success) {
            setMessages([...res.data]);
            scrollToBottom();
            startSpeaking(res.data[res.data.length - 1]);
          } else {
            ToastAndroid.showWithGravity(
              'Something went wrong, please try again',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        });
        return newMessages;
      });
    }
  };

  const startSpeaking = message => {
    if (!message.content.includes('https://')) {
      Tts.speak(message.content);
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    Tts.stop();
    setIsSpeaking(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    // Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => setIsSpeaking(false));
    // Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="flex-1 bg-black pt-14">
      <View className=" px-4">
        <Text className="text-white text-2xl font-bold ">Hello,</Text>
        <Text className="text-white text-2xl font-bold mt-2">
          My name is OvaDrive 👋
        </Text>
        <Text className="text-gray-400 text-lg font-bold mt-2">
          What can I help you with?
        </Text>
      </View>
      <View className="flex-1 justify-end ">
        {messages.length > 0 ? (
          <View className="flex-1 justify-start p-4 border">
            <ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              bounces={false}
              className="flex-1 border ">
              {messages.map((message, index) => {
                if (message.role === 'user') {
                  return (
                    <View
                      key={`${Math.random().toString()}-${index}}`}
                      className="flex flex-row justify-end">
                      <LinearGradient
                        colors={['#21204F', '#302F5F']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          marginBottom: 10,
                          width: '80%',
                        }}>
                        <Text
                          style={{
                            backgroundColor: 'transparent',
                            fontSize: 15,
                            color: '#fff',
                          }}>
                          {message.content}
                        </Text>
                      </LinearGradient>
                    </View>
                  );
                } else {
                  if (message.content.includes('https://')) {
                    return (
                      <View
                        key={`${Math.random().toString()}-${index}}`}
                        className="flex flex-row justify-start mb-2">
                        <Image
                          source={{
                            uri: message.content,
                          }}
                          className="w-[200px] h-[200px] rounded-xl"
                        />
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={`${Math.random().toString()}-${index}}`}
                        className="flex flex-row justify-start">
                        <LinearGradient
                          colors={['#5d1df3', '#b298f1']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            borderRadius: 20,
                            padding: 10,
                            marginBottom: 10,
                            width: '80%',
                          }}>
                          <Text
                            style={{
                              backgroundColor: 'transparent',
                              fontSize: 15,
                              color: '#fff',
                            }}>
                            {message.content}
                          </Text>
                        </LinearGradient>
                      </View>
                    );
                  }
                }
              })}
            </ScrollView>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg font-bold mt-10">
              Start conversation by
            </Text>
            <Text className="text-white text-lg font-bold mt-2">
              "Asking some interesting question"
            </Text>
          </View>
        )}
        <View className="flex flex-row border-t-2 border-[#b298f1] rounded-t-xl justify-center items-center">
          <Pressable
            onPress={() => setIsMicOn(!isMicOn)}
            style={({pressed}) => pressed && {opacity: 0.5}}
            className=" justify-center items-center p-2">
            {isMicOn ? (
              <Pressable
                onPress={() => stopRecording()}
                style={({pressed}) => pressed && {opacity: 0.5}}>
                <Image
                  source={require('../assets/micOn.gif')}
                  className="w-[130px] h-[130px]"></Image>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => startRecording()}
                style={({pressed}) => pressed && {opacity: 0.5}}>
                <Image
                  source={require('../assets/micOff.png')}
                  className="w-[122px] h-[122px] mb-2"></Image>
              </Pressable>
            )}
          </Pressable>
        </View>
        {isSpeaking && (
          <Pressable
            onPress={stopSpeaking}
            style={({pressed}) => pressed && {opacity: 0.5}}
            className="absolute right-10 bottom-12 border border-[#b298f1] justify-center items-center p-2 rounded-xl">
            <Text className="text-white text-lg font-bold">Stop</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
