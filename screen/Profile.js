import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserDetailContext } from '../context/UserDetailContext'; // adjust path as needed
import { ProfileMenu } from '../constant/Option';// adjust path as needed
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export const Profile = () => {
  const { userDetail } = useContext(UserDetailContext);
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleNavigation = (path) => {
    if (path) navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/wave1.png')} style={{position:'absolute', width:'500', height:300}}/>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.imageContainer}>
        <Image
          source={selectedImage ? { uri: selectedImage } : require('../assets/profile.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.plusIcon} onPress={pickImage}>
          <Icon name="add-circle" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>{userDetail?.username || 'User'}</Text>
      <Text style={styles.email}>{userDetail?.email || 'user@example.com'}</Text>

      <FlatList
        data={ProfileMenu}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation(item.path)}>
            <Icon name={item.icon} size={29} color="#007bff"/>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',

  },
  imageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 10,
    
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 5,


  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    fontSize: 15,
    textAlign: 'center',
    color: '#888',
    marginBottom: 50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 17,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 14,
    elevation: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
 
});