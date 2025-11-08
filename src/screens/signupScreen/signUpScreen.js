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
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from '@react-native-firebase/auth';

const Signupscreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 4000);
  };

  const onSignup = async () => {
    // Validation
    if (!name || !email || !password) {
      showError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setSubmitting(true);
      const app = getApp();
      const auth = getAuth(app);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Update user profile with display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name.trim(),
        });

        try {
          await sendEmailVerification(userCredential.user);
        } catch (verificationError) {
          console.warn('Failed to send verification email:', verificationError);
          showError(
            'Account created, but we could not send a verification email. Please try resending from the next screen.',
          );
        }
      }

      // Navigation will be handled automatically by auth state listener in RootNavigator
      // The stack will be reset when switching from AuthStack to AppStack
    } catch (error) {
      // Show the actual error message from Firebase Auth backend
      let message = 'Unable to create account. Please try again.';
      
      if (error && error.message) {
        // Use the backend error message directly
        message = error.message;
      } else if (error && error.code) {
        // Fallback to error code if message is not available
        message = `Error: ${error.code}`;
      }
      
      showError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subheading}>Join PersistAI in seconds</Text>
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
          <Text style={[styles.eyeButtonText, showPassword && styles.eyeButtonTextActive]}>
            {showPassword ? 'HIDE' : 'SHOW'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={onSignup} disabled={submitting}>
        <LinearGradient
          colors={['#5d1df3', '#b298f1']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.primaryButton}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign In</Text>
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


export default Signupscreen;
