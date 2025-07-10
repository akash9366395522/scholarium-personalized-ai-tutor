import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator,
} from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebaseConfig';
import { UserDetailContext } from '../context/UserDetailContext';

const { width } = Dimensions.get('window');

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    if (!email.includes('@')) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!isChecked) {
      setError('Please accept the terms and privacy policy');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, 'users', email), {
        name: username,
        email: email,
        member: false,
        uid: user.uid,
      });

      // Store user details locally
      await AsyncStorage.setItem('userData', JSON.stringify({
        email: email,
        username: username,
        uid: user.uid,
      }));

      // Optional: Set user detail in context
      setUserDetail({
        email: email,
        username: username,
        uid: user.uid,
        member: false,
      });

      navigation.navigate('TabNavigation');
    } catch (e) {
      console.error('❌ Signup error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Take the first step</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="lightgray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'lightgray'}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="lightgray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={'lightgray'}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="lightgray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'lightgray'}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo name={passwordVisible ? 'eye' : 'eye-with-line'} size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="lightgray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor={'lightgray'}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Entypo name={confirmPasswordVisible ? 'eye' : 'eye-with-line'} size={24} color="lightgray" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkboxChecked]}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <FontAwesome name="check" size={16} color="white" />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>I accept the terms and privacy policy</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isChecked && styles.buttonActive, loading && styles.buttonDisabled]}
        disabled={!isChecked || loading}
        onPress={handleSignup}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.buttonText, isChecked && styles.buttonTextActive]}>
            Sign up
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <FontAwesome name="facebook" size={30} color="black" />
        <AntDesign name="apple1" size={30} color="black" />
        <AntDesign name="google" size={30} color="black" />
      </View>

      <Text style={styles.loginText}>
        Already have an account?
        <Text style={styles.loginLink} onPress={() => navigation.navigate('SignIn')}>
          {' '}Sign In
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
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginTop: width * 0.01,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 6,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#c4cbe9',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: width * 0.04,
    color: 'black',
  },
  icon: {
    marginHorizontal: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
  checkboxText: {
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: width * 0.04,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonActive: {
    backgroundColor: '#001740',
    borderColor: '#c4cbe9',
  },
  buttonText: {
    color: '#001740',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  buttonTextActive: {
    color: '#ffffff',
  },
  buttonDisabled: {
    opacity: 0.7,
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
    fontSize: width * 0.055,
    color: 'black',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 10,
    marginBottom: 40,
  },
  loginText: {
    marginTop: 15,
    fontSize: width * 0.04,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#ffc30f',
  },
});
