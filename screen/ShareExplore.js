import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { imageAssets } from '../constant/Option';
import { CourseList } from '../Components/Home/CourseList';
const { width } = Dimensions.get('window');

export const ShareExplore = ({category}) => {
    const [courseList, setCourseList]=useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        if (category) {
          GetCourseListByCategory();
        }
      }, [category]);
      
    const GetCourseListByCategory=async()=>{
        setCourseList([]);
        const q=query(collection(db, 'Courses'), where('category', '==', category));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
           
            setCourseList(prev=>[...prev,doc.data()]);
        })
    }
  return (

    <View>
        {courseList?.length>0 &&
      <CourseList courseList={courseList} heading={category}
      enroll={true}/>}
    </View>
  )
}



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
})