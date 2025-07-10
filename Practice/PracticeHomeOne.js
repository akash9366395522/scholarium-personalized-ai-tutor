import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { PraticeOption } from '../constant/Option';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserDetailContext } from '../context/UserDetailContext';
import { CourseSet } from '../Components/PracticeS/CourseSet';
export const PracticeHomeFlashcards = () => {
    const navigation = useNavigation();
    const route = useRoute();
  const { type } = route.params;
    const option=PraticeOption.find(item => item.name === type 
    );
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
const [loading,setLoading]=useState(false);
const [courseListTwo,setCourseListTwo]=useState([]);

    useEffect(()=>{
      
userDetail&&GetCourseList();


    },[userDetail])


const GetCourseList=async()=>{
  setLoading(true);
  setCourseListTwo([])
  try{
    const q=query(collection(db,'Courses'), 
    where('createdBy', '==', userDetail?.email),
    orderBy('createdOn','desc')
  );
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
       // console.log(doc.data());
        setCourseListTwo(prev=>[...prev,doc.data()]);
    })
    setLoading(false);
  }
  catch(e){
    console.log(e);
    setLoading(false);
  }
}

  return (
    <View>
      <Image source={option?.image}
      style={{width:'100%', height:200}}/>
      <View style={{position:'absolute', padding:10,paddingTop:15, display:'flex', flexDirection:'row', gap:10}}>
        <Pressable
              style={{ marginTop:5, }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={40} color="white" />
            </Pressable>
        <Text style={{fontSize:35, fontWeight:'bold', color:'white'}}>{type}</Text>
      </View>
      {loading&&<ActivityIndicator size={'large'} color={'#00103D'}
      style={{marginTop:150}}/>}
      <CourseSet courseListTwo={courseListTwo}
      option={option}/>
    </View>
  )
}



const styles = StyleSheet.create({})