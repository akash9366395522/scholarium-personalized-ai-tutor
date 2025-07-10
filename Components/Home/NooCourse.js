import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const NooCourse= () => {
 const navigation = useNavigation();

  return (
    <View style={styles.container}>
      

      
      <Image
        source={require('../../assets/empty.png')} 
        style={styles.boxImage}
        resizeMode="contain"
      />

     
      <Text style={styles.noCourseText}>You Don’t Have Any Courses</Text>

      
      <TouchableOpacity style={styles.primaryButton}
      onPress={() => navigation.navigate('CreateCourse')}>
        <Text style={styles.primaryButtonText}>+ Create New One</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Explore Existing Courses</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f9ff',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  
  boxImage: {
    width: 230,
    height: 230,
    marginVertical: 40,
  },
  noCourseText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#001F54',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#001F54',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#001F54',
    fontSize: 18,
  },
});