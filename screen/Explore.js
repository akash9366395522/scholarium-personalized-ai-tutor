import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { CourseCategory } from '../constant/Option'
import { ShareExplore } from './ShareExplore'

export const Explore = () => {
  return (
    <FlatList
    style={{flex:1,backgroundColor:'#e8f9ff'}}
    data={[]}
    ListHeaderComponent={
    <View style={{padding:25,paddingBottom:80}}>
      <Image source={require('./../assets/wave1.png')} style={{position:'absolute', width:'500', height:600}}/>
      <Text style={{fontSize:25, fontWeight:'bold', marginTop:10, color:'#fff'}}>Explore More Courses</Text>
      {CourseCategory.map((item, index)=>(
        <View key={index} 
        style={{marginTop:10}}>
          
          <ShareExplore category={item}/>
        </View>
      ))}
    </View>}/>
  )
}



const styles = StyleSheet.create({})