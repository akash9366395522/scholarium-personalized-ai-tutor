import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import FlipCard from 'react-native-flip-card';

export const FlashCard = () => {
    const route = useRoute();
        const { courseParams } = route.params; // params coming from navigation
        const course = JSON.parse(courseParams);
        const flashcard=course?.flashcards;
        const[currentPage,setCurrentPage]=useState(0);
        const width=Dimensions.get('screen').width;
const navigation = useNavigation();

        const onScroll=(event)=>{
          const index=Math.round(event?.nativeEvent?.contentOffset?.x/width);
          setCurrentPage(index);
        }

        const GetProgress = (currentPage) => {
          const perc = (currentPage / flashcard?.length);
          return perc;
        }
  return (
    <View>
      <Image source={require('./../assets/wave1.png')} style={{width:'100%',height:800}}/>
      <View style={{position:'absolute',padding:20,width:'100%'}}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                 
                      <Pressable
                                    style={{ marginTop:5, }}
                                    onPress={() => navigation.goBack()}
                                  >
                                    <Ionicons name="arrow-back" size={40} color="white" />
                                  </Pressable>
                                  <Text style={{fontSize:22,color:'white', fontWeight:'bold'}}>{currentPage+1} of {flashcard?.length} questions</Text>
                  
              </View>

 <View
        style={{marginTop:10}}>
<Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('window').width * 0.85} color = 'white' height={5}/>
        </View>

              <FlatList
              data={flashcard}
              horizontal={true}
              pagingEnabled
              onScroll={onScroll}
              showsHorizontalScrollIndicator={false}
              renderItem={({item,index})=>(
                <View 
                style={{height: 500, width: width*0.9,marginTop:80}}>
                    <FlipCard style={styles.flipcard}>
{/* Face Side */}
<View style={styles.frontcard}>
    <Text style={{fontSize:24, fontWeight:'bold', color:'#001F54'}}>{item?.front}</Text>
</View>

{/* Back Side */}
<View style={styles.backcard}>
    <Text style={{width:Dimensions.get('screen').width*0.78,padding:20,textAlign:'center',color:'white', fontSize:24}}>{item?.back}</Text>
</View>



                    </FlipCard>

                </View>
              )}/>
              </View>
             
                
    </View>
  )
}



const styles = StyleSheet.create({
    flipcard: {
        width:Dimensions.get('screen').width*0.78,
        height:400,
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        marginHorizontal: Dimensions.get('screen').width*0.05
    },
    frontcard: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100%',
      borderRadius:20,
        
    },
    backcard: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100%',
      backgroundColor:'#001F54',
      borderRadius:20,
    },

}) 