import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const Signupscreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    // TODO: integrate Firebase Auth createUserWithEmailAndPassword
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subheading}>Join OvaDrive in seconds</Text>
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Serena Gomez"
        placeholderTextColor="#70757a"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="serena88@gmail.com"
        placeholderTextColor="#70757a"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="*************"
        placeholderTextColor="#70757a"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity activeOpacity={0.9} onPress={onSignup}>
        <LinearGradient
          colors={['#5d1df3', '#b298f1']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signupscreen;
