import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getApp} from '@react-native-firebase/app';
import {
  getAuth,
  reload,
  sendEmailVerification,
  signOut,
} from '@react-native-firebase/auth';

const showToast = (title, message) => {
  const content = message ? `${title}\n${message}` : title;

  if (Platform.OS === 'android') {
    ToastAndroid.show(content, ToastAndroid.LONG);
  } else {
    Alert.alert(title, message);
  }
};

const EmailVerificationScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(getApp());
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const checkVerificationStatus = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      setStatusMessage('Session expired. Please sign in again.');
      setChecking(false);
      return;
    }

    setChecking(true);
    try {
      setStatusMessage('');
      await reload(user);
      if (user.emailVerified) {
        setStatusMessage('Email verified! Redirecting...');
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        setStatusMessage(
          `We sent a verification link to ${user.email}. Please check your inbox (including spam).`,
        );
      }
    } catch (error) {
      const message =
        error?.message ?? 'Unable to refresh verification status. Please try again.';
      setStatusMessage(message);
      showToast('Verification check failed', message);
    } finally {
      setChecking(false);
    }
  }, [auth, navigation]);

  useFocusEffect(
    useCallback(() => {
      checkVerificationStatus();
    }, [checkVerificationStatus]),
  );

  const handleResendEmail = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      setStatusMessage('Session expired. Please sign in again.');
      return;
    }

    if (user.emailVerified) {
      setStatusMessage('Your email is already verified.');
      return;
    }

    try {
      setResending(true);
      await sendEmailVerification(user);
      setStatusMessage('Verification email sent again. Check your inbox or spam folder.');
      showToast('Verification email sent', 'Check your inbox or spam folder.');
    } catch (error) {
      const message =
        error?.message ?? 'Unable to resend the verification email. Please try later.';
      setStatusMessage(message);
      showToast('Resend failed', message);
    } finally {
      setResending(false);
    }
  }, [auth]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const message =
        error?.message ?? 'Unable to sign out. Please try again.';
      setStatusMessage(message);
      showToast('Sign out failed', message);
    }
  }, [auth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        We just sent a verification link to {auth.currentUser?.email ?? 'your email address'}.
      </Text>

      {Boolean(statusMessage) && <Text style={styles.status}>{statusMessage}</Text>}

      <TouchableOpacity
        style={[styles.primaryButton, checking && styles.disabledButton]}
        activeOpacity={0.9}
        onPress={checkVerificationStatus}
        disabled={checking}>
        {checking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>I verified, check again</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, resending && styles.disabledSecondaryButton]}
        activeOpacity={0.9}
        onPress={handleResendEmail}
        disabled={resending}>
        {resending ? (
          <ActivityIndicator color="#5d1df3" />
        ) : (
          <Text style={styles.secondaryButtonText}>Resend verification email</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Use a different email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#0e1117',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 24,
  },
  status: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#5d1df3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.7,
  },
  secondaryButton: {
    borderColor: '#5d1df3',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledSecondaryButton: {
    opacity: 0.6,
  },
  secondaryButtonText: {
    color: '#5d1df3',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    alignItems: 'center',
  },
  signOutText: {
    color: '#9ca3af',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default EmailVerificationScreen;


