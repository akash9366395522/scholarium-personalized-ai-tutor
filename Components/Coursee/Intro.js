import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { imageAssets } from '../../constant/Option';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserDetailContext } from '../../context/UserDetailContext';
import { doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const Intro = ({course, enroll}) => {
 const {userDetail, setUserDetail}=useContext(UserDetailContext);
  const onEnrollCourse =  async()=>{
const docId=Date.now().toString();
await setDoc(doc(db, 'Courses',docId ),{
  ...course,
  createdBy:userDetail?.email,
createdOn:new Date(),
enrolled:true})}
  

  
    
  return (
    
      <View >
       
      <Image style={styles.image} source={imageAssets[course?.banner_image]} />
<View style={{
    padding: 20,
    paddingBottom: 10,
   
}}> 

    <Text style={{fontSize:16, fontWeight:'bold'}}>{course?.courseTitle} </Text>
   <View style={styles.icons}>
                 <Ionicons name="book" size={18} color="green" />
                 <Text style={styles.chapters}>{course?.chapters?.length} Chapters</Text>
               </View>
               <Text style={{fontSize:18, fontWeight:'bold', marginTop:10}}>Description:</Text>
               <Text style={{ fontSize: 15, color: 'grey', marginTop: 5, marginBottom: 5 }}>
  {course?.description?.split('.')[0] + '.'}
</Text>
{enroll? <TouchableOpacity style={styles.button1}

>
       
       <Text style={styles.buttonText1}>Enroll Now</Text>
      </TouchableOpacity>:
      <TouchableOpacity style={styles.button1}

>
       
       <Text style={styles.buttonText1}>Start Now</Text>
      </TouchableOpacity>}

</View>
 
 


    </View>
    
  )
};



const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 280,
        
      },
      chapters: {
        fontSize: 15,
        color: 'green',
        paddingBottom: 2,
      },
    
      icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        gap: 5,
      },
      button1: {
        backgroundColor: '#00103D',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 15,
      },
      buttonText1: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
      },
})