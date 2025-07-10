import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ChatFaceData } from '../Services/ChatFaceData';


export const Chat = () => {
  const navigation = useNavigation();
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState(null);

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFaceData(ChatFaceData[0]);
  }, []);

  if (!selectedChatFaceData) {
    return <Text>Loading...</Text>; // or a spinner
  }
  const onChatFacePress=async(id)=>{ 
    setSelectedChatFaceData(ChatFaceData[id-1]);
    
}

  return (
    <View style={{ alignItems: 'center', paddingTop: 90, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ color: selectedChatFaceData.primary, fontSize: 30 }}>Hello,</Text>
      <Text style={{ color: selectedChatFaceData.primary, fontSize: 30, fontWeight: 'bold' }}>
        I am {selectedChatFaceData.name}
      </Text>
      <Image source={{uri:selectedChatFaceData.image}} 
        style={{height:150,width:150,marginTop:20}}/>
    <Text style={{marginTop:30,fontSize:25}}>How Can I help you?</Text>
    <View style={{marginTop:20,backgroundColor:'#F5F5F5',
    alignItems:'center',
    height:110,padding:10
,borderRadius:10}}>
        <FlatList
        data={chatFaceData}
        horizontal={true}
        renderItem={({item})=>item.id!=selectedChatFaceData.id&&(
            <TouchableOpacity style={{margin:15}} 
            onPress={()=> 
              onChatFacePress(item.id)
             }>
            <Image source={{uri:item.image}} style={{width:40,height:40}} />
        </TouchableOpacity> 
        )}
        />
        <Text style={{marginTop:5,fontSize:17,color:'#B0B0B0'}}>Choose Your Fav ChatBuddy</Text>
    </View>

    <TouchableOpacity style={[{backgroundColor:selectedChatFaceData.primary}
        ,{marginTop:40,padding:17,width:Dimensions.get('screen').width*0.6,
         borderRadius:100,alignItems:'center'}]} 
         onPress={() =>
          navigation.navigate('ChatBot', {
            botData: selectedChatFaceData
          })
        }>
        <Text style={{fontSize:16,color:'#fff'}}>Let's Chat</Text>
    </TouchableOpacity>

    </View>
  );
};



