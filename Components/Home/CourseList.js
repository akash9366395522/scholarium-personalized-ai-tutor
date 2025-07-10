import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { imageAssets } from '../../constant/Option';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

export const CourseList = ({ courseList,heading="Courses", enroll=false }) => {

   const navigation = useNavigation();
  return (
    <View style={{ marginTop: 1, marginBottom: 10 }}>
      <Text style={styles.heading}>{heading}</Text>
      <FlatList
        data={courseList}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => navigation.navigate('Vieww', { courseParams: JSON.stringify(item), enroll: enroll })}








          style={styles.iContainer}>
            <Image source={imageAssets[item.banner_image]} style={styles.bimage} />

            <Text style={styles.cheading}>{item?.courseTitle}</Text>

            <View style={styles.icons}>
              <Ionicons name="book" size={18} color="black" />
              <Text style={styles.chapters}>{item?.chapters?.length} Chapters</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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

  bimage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },

  iContainer: {
    backgroundColor: 'white', // pink background
    marginRight: 15,
    borderRadius: 15,
    width: width * 0.6, // ~60% of screen
    padding: 10,
    justifyContent: 'flex-start',
  },

  cheading: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00103D',
  },

  chapters: {
    fontSize: 13,
    color: '#333',
  },

  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 5,
  },
});
