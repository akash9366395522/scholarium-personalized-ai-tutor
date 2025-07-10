import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PraticeOption } from '../../constant/Option';

export const PracticeSection = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.heading}>Practice</Text>
      <View style={{marginHorizontal: 8}}>
      <FlatList
        data={PraticeOption}
       numColumns={3}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => (
          <TouchableOpacity
          onPress={() => navigation.navigate('PracticeHome' + item.name, { type: item.name })}
          key={index} style={{ flex: 1, margin: 5, aspectRatio: 1 }}>
            <Image source={item?.image} style={styles.image} />
            <Text style={styles.itext}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00103D',
    marginHorizontal: 10,
    marginBottom: 5,
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  itext: {
    position: 'absolute',
    padding: 15,
    fontSize: 15,
    color: '#111',
    fontWeight: '500',

  }
});
