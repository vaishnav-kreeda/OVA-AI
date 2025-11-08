import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {getApp} from '@react-native-firebase/app';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import {signInWithGoogle} from '../../services/googleAuth';
import {Text as RNText} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // email login only

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 4000);
  };

  const onLogin = async () => {
    if (!email || !password) {
      showError('Please enter both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      const app = getApp();
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Navigation will be handled automatically by auth state listener in RootNavigator
      // The stack will be reset when switching from AuthStack to AppStack
    } catch (error) {
      // Show the actual error message from Firebase Auth backend
      let message = 'Unable to sign in. Please try again.';

      if (error?.code === 'auth/user-not-found') {
        message = 'No account exists with that email. Please sign up first.';
      } else if (error?.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again or reset it.';
      } else if (error?.code === 'auth/invalid-credential') {
        message = 'Email or password is incorrect. Check your details and try again.';
      } else if (error?.message) {
        // Use the backend error message directly
        message = error.message;
      } else if (error?.code) {
        // Fallback to error code if message is not available
        message = `Error: ${error.code}`;
      }

      showError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      setGoogleSubmitting(true);
      await signInWithGoogle();
    } catch (error) {
      let message = 'Google sign-in failed. Please try again.';

      if (error && error.message) {
        message = error.message;
      } else if (error && error.code) {
        message = `Error: ${error.code}`;
      }

      showError(message);
    } finally {
      setGoogleSubmitting(false);
    }
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
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword((prev) => !prev)}
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
          <RNText style={[styles.eyeButtonText, showPassword && styles.eyeButtonTextActive]}>
            {showPassword ? 'HIDE' : 'SHOW'}
          </RNText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onLogin}
        disabled={submitting || googleSubmitting}>
        <LinearGradient
          colors={['#5d1df3', '#b298f1']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.primaryButton}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign In</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        activeOpacity={0.9}
        onPress={onGoogleLogin}
        disabled={googleSubmitting || submitting}>
        {googleSubmitting ? (
          <ActivityIndicator color="#5d1df3" />
        ) : (
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {Boolean(errorMessage) && (
        <View
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 20,
            backgroundColor: '#d93025',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
