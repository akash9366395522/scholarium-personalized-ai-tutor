import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { ShareProgress } from '../../screen/ShareProgress';

export const CourseProgress = ({ courseList }) => {


  


  return (
    <View>
      <Text style={styles.heading}>Progress</Text>

      <FlatList
  data={courseList}
  extraData={courseList}
  horizontal
  showsHorizontalScrollIndicator={false}
  
  renderItem={({ item, index }) => (
    <View  key={index}>
    <ShareProgress item={item}/>
    </View>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00103D',
    marginHorizontal: 10,
    marginBottom: 5,
    paddingLeft: 10,
  },

  courseCard: {
    margin: 7,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 280, // same card width
  },

  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bimage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  textContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  courseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'wrap',
  },

  chapterText: {
    fontSize: 14,
    marginTop: 4,
    color: 'grey',
    fontWeight: 'bold',
  },
  bar:{

    marginTop: 10,

  },
  bartext: {
    fontSize: 12,
    
    marginTop: 2,
  },
});
