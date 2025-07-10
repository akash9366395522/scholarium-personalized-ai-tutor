import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../firebaseConfig';
import { UserDetailContext } from '../context/UserDetailContext';

const { width } = Dimensions.get('window');

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!email.includes('@')) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Save user to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify({
          email: userData.email,
          username: userData.name,
          uid: userData.uid,
        }));

        // Update global context
        setUserDetail({
          email: userData.email,
          username: userData.name,
          uid: userData.uid,
          member:false,
        });

        navigation.navigate('TabNavigation');
      } else {
        setError('Signup details not found. Please sign up first.');
      }

    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('Email not found.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo name={passwordVisible ? 'eye' : 'eye-with-line'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Don't have an account?
        <Text style={styles.loginLink} onPress={() => navigation.navigate('SignUp')}>
          {' '}Sign up
        </Text>
      </Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.06,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: width * 0.39,
    height: width * 0.39,
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 5
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: width * 0.04,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 6,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#c4cbe9',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  icon: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingLeft: 5,
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: '#001740',
    padding: width * 0.04,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: width * 0.05,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  loginText: {
    marginTop: 60,
    fontSize: width * 0.04,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#ffc30f',
  },
});

