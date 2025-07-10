import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { UserDetailContext } from '../context/UserDetailContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ShareProgress } from './ShareProgress';
import { useNavigation } from '@react-navigation/native';

export const Progress = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Used only for pull-to-refresh
  const navigation = useNavigation();

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
    
    <View>
      <Image source={require('./../assets/wave1.png')} style={{position:'absolute'}}/>
      <View style={{width:'100%',position:'absolute',padding:20}}>
        <Text style={{fontSize:26,fontWeight:'bold', color:'white', marginBottom:10, marginTop:10}}>Course Progress</Text>
        <FlatList
        data={courseList}
        onRefresh={onPullToRefresh}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Vieww', { courseParams: JSON.stringify(item) })}>
<ShareProgress item={item} width={'95%'}/>
          </TouchableOpacity>
        )}
        />

      </View>
    </View>
  )
}



const styles = StyleSheet.create({})
