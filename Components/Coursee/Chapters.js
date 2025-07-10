import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Chapters = ({ course }) => {
  const navigation = useNavigation();

  const isChapterCompleted = (index) => {
    // Check if the index is present in completedChapter array
    return course?.completedChapter?.includes(index);
  };
  
  

  return (
    <View style={{ paddingTop: 10, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chapters</Text>
      <FlatList
        data={course?.chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Lesson', {
                chapterParams: JSON.stringify(item),
                docId: course?.docId,
                chapterIndex: index
              });
            }}
            style={{
              padding: 15,
              elevation: 2,
              backgroundColor: '#f9f9f9',
              borderRadius: 15,
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText}>{item?.chapterName}</Text>
            </View>
            {isChapterCompleted(index) ?
              <Ionicons name="checkmark-circle" size={18} color="green" />
              : <Ionicons name="play" size={18} color="red" />
            }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chapterText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
