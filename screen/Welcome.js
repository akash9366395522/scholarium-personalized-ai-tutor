import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');
const BOX_HEIGHT = height * 0.4; // 40% of screen height

export const Welcome = () => {
  const navigation = useNavigation();
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const boxTranslateY = useRef(new Animated.Value(BOX_HEIGHT)).current;
  const boxOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Animate box up and logo up
      Animated.parallel([
        Animated.timing(logoTranslateY, {
          toValue: -BOX_HEIGHT / 2, // move logo up
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(boxOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(boxTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#daf1f7" barStyle="dark-content" />

      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: logoTranslateY }] },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomBox,
          {
            height: BOX_HEIGHT,
            opacity: boxOpacity,
            transform: [{ translateY: boxTranslateY }],
          },
        ]}
      >
        <View style={styles.innerBox}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.description}>
          Create custom courses in minutes. AI-powered, interactive, and tailored to your needs. Learn smarter, faster, and better—together.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.signUpButton]}
            onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.buttonText, { color: '#001740' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -125, // half of 250
    marginLeft: -125, // half of 250
    width: 250,
    height: 250,
    zIndex: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#c4cbe9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000', // shadow color for iOS
    shadowOffset: { width: 0, height: -2 }, // shadow position
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 5, // shadow blur radius
    elevation: 5, // for Android
  },
  innerBox: {
    flex: 1,
    padding: 25,
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#001740',
    marginTop: 40,
  },
  description: {
    fontSize: 14,
    color: '#001740',
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 40,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000', // shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // shadow position
    shadowOpacity: 0.2, // shadow opacity
    shadowRadius: 5, // shadow blur radius
    elevation: 5, // for Android
  },
  signInButton: {
    backgroundColor: '#001740',
  },
  signUpButton: {
    backgroundColor: '#e8f9ff',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
});
