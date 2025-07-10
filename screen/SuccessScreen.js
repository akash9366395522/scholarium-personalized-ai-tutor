import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';

export const SuccessScreen=({ navigation })=> {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setShowContent(true);
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/Sound.mp3') // Add a pop sound here
      );
      await sound.playAsync();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#001640" barStyle="light-content" />

      {showContent && (
        <>
          {/* Animated Home Icon in Top-Left */}
          <Animatable.View animation="zoomIn" duration={500} style={styles.homeIcon}>
            <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')}>
              <Icon name="home-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </Animatable.View>

          {/* Center Content */}
          <Animatable.View animation="zoomIn" duration={500} style={styles.centerContent}>
            <View style={styles.tickCircle}>
              <Icon name="checkmark-done-sharp" size={70} color="#001740" />
            </View>
            <Text style={styles.successText}>Payment Successful !</Text>
          </Animatable.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001740',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  centerContent: {
    alignItems: 'center',
    marginTop: 1,
  },
  tickCircle: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 40,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
