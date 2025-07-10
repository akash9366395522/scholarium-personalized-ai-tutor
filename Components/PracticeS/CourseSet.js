import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export const CourseSet = ({courseListTwo, option}) => {
  const navigation = useNavigation(); // Correct hook here

  const onPress = (course) => {
    if (option?.name === 'Quiz') {
      navigation.navigate('Quizz', { courseParams: JSON.stringify(course) }); 
      // Make sure 'Quizz' is correctly registered in your navigator
    }
    else if (option?.name === 'Flashcards') {
      navigation.navigate('FlashCard', { courseParams: JSON.stringify(course) }); 
      // Make sure 'FlashCard' is correctly registered in your navigator
    }
    else if (option?.name === 'Questions') {
      navigation.navigate('Question', { courseParams: JSON.stringify(course) }); 
      // Make sure 'Questions' screen is registered in your navigator
    }
      
    };
  

  return (
    <View>
      <FlatList
      data={courseListTwo}
      numColumns={2}
      style={{
        padding:20
      }}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress={() => onPress(item)}
         key={index}
        style={{
            flex:1,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',    
            alignItems:'center',
            padding:15,
            backgroundColor:'#fff',
            margin:7,
            borderRadius:15,
            elevation:5}}>
                <Ionicons name="checkmark-circle" size={22} color="grey" 
                style={{position:'absolute', top:10,right:10}}/>
          <Image source={option?.icon} style={{width:'100%',height:100, objectFit:'contain'}}/>
          <Text
          style={{fontSize:14,textAlign:'center', marginTop:7}}>{item?.courseTitle}</Text>
        </TouchableOpacity>
          
      )}
      
      
      />
    </View>
  )
}



const styles = StyleSheet.create({})