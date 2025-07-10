import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext';
import { Directions } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
    const navigation = useNavigation();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
 
  return (
    <View style={styles.container}>
      
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>
            {userDetail?.username || 'User'} 👋
          </Text>
        </View>
        <TouchableOpacity style={styles.plusButton}
        onPress={() => navigation.navigate('CreateCourse')}
        >
                <Icon name="add" size={32} color="#fff" />
              </TouchableOpacity>
      
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
  },
 
  greeting: {
    fontSize: 16,
    color: 'grey',
  },
  username: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000',
  },
  plusButton: {
    backgroundColor: '#001944', // navy blue
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  

});
