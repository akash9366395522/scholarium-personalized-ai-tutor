import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Intro=()=> {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.tagline}>
        COURSES TAILORED BY INTELLIGENCE{'\n'}GUIDED BY CONVERSATION.
      </Text>

      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f9ff', // Light blue background
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 3,
    marginTop: 150,
  },
  tagline: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 150,
  },
  button: {
    backgroundColor: '#0a1f44', // Deep navy blue
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 40,
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
