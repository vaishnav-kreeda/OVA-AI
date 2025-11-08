import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getApp} from '@react-native-firebase/app';
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from '@react-native-firebase/auth';

let configured = false;

const configureGoogleSignIn = () => {
  if (configured) {
    return;
  }

  GoogleSignin.configure({
    webClientId: '665821253047-r5r044b104bbdanqpfb22o78o4p3l1ej.apps.googleusercontent.com',
    offlineAccess: false,
    forceCodeForRefreshToken: false,
  });

  configured = true;
};

export const signInWithGoogle = async () => {
  configureGoogleSignIn();

  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  await GoogleSignin.signIn();
  const {idToken} = await GoogleSignin.getTokens();

  if (!idToken) {
    throw new Error('Google sign-in did not return an ID token.');
  }

  const app = getApp();
  const auth = getAuth(app);

  const googleCredential = GoogleAuthProvider.credential(idToken);

  return signInWithCredential(auth, googleCredential);
};


