import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // email login only

  const onLogin = () => {
    // TODO: integrate Firebase Auth
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>Sign in to continue</Text>
      </View>

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
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="*************"
          placeholderTextColor="#70757a"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={onLogin}>
        <LinearGradient
          colors={['#5d1df3', '#b298f1']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
