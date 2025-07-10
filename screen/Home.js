import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import React, {  useState, useContext } from 'react';
import { Header } from '../Components/Home/Header';
import { NooCourse } from '../Components/Home/NooCourse';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserDetailContext } from '../context/UserDetailContext';
import { CourseList } from '../Components/Home/CourseList';

import { PracticeSection } from '../Components/Home/PracticeSection';
import { CourseProgress } from '../Components/Home/CourseProgress';
import { useFocusEffect } from '@react-navigation/native';

export const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Used only for pull-to-refresh
  

  useFocusEffect(
    React.useCallback(() => {
      if (userDetail) {
        fetchCoursesSilently(); // always runs when Home gets focused
      }
    }, [userDetail])
  );
  

  const fetchCoursesSilently = async () => {
    try {
      const q = query(collection(db, 'Courses'), where('createdBy', '==', userDetail?.email));
      const querySnapshot = await getDocs(q);
      const courses = [];
      querySnapshot.forEach((doc) => {
        const courseData = doc.data();
        courseData.docId = doc.id;
        courses.push(courseData);
      });
      setCourseList(courses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  const onPullToRefresh = async () => {
    setRefreshing(true);
    await fetchCoursesSilently();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={[]} // dummy data to allow ListHeaderComponent with pull-to-refresh
      onRefresh={onPullToRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <View style={{ flex: 1, marginTop: -20, backgroundColor: '#e8f9ff' }}>
          <Header />
          {courseList.length > 0 ? (
            <View>
             
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
              <View style={{ height: 100 }}></View>
            </View>
          ) : (
            <NooCourse />
          )}
        </View>
      }
    />
  );
};
