import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Intro } from '../Components/Coursee/Intro';
import { Chapters } from '../Components/Coursee/Chapters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
export const Vieww = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseParams, enroll} = route.params;
  const parsedCourse = JSON.parse(courseParams, enroll);
  const [course, setCourse] = useState(parsedCourse); // show passed data instantly

  useFocusEffect(
    React.useCallback(() => {
      const fetchLatestCourse = async () => {
        try {
          const docRef = doc(db, 'Courses', parsedCourse.docId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCourse({ ...docSnap.data(), docId: parsedCourse.docId });
 // update UI silently
          }
        } catch (error) {
          console.log('Error fetching course:', error);
        }
      };

      fetchLatestCourse(); // no loader, just update behind the scenes
    }, [parsedCourse.docId])
  );

  return (
    <View style={{ flex: 1 }}>
    {/* Back Arrow */}
    <Pressable
      style={{ position: 'absolute', top: 20, left: 10, zIndex: 1 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={40} color="white" />
    </Pressable>

    {/* Content */}
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
          <Intro course={course} enroll={enroll} />
          <Chapters course={course} />
        </View>
      }
    />
  </View>
  );
};

const styles = StyleSheet.create({});





