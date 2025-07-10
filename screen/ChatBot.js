import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
  } from 'react-native';
  import React, { useState, useRef } from 'react';
  import axios from 'axios';
  import ChatBubble from './ChatBubble';
  import { speak, isSpeakingAsync, stop } from 'expo-speech';
  import { Ionicons } from 'react-native-vector-icons';
  import { useRoute } from '@react-navigation/native';

  
  export const ChatBot = () => {
    const route = useRoute();
const { botData } = route.params || {};

    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    const primaryColor = botData?.primary || '#000'; // fallback to black if undefined

  
    const flatListRef = useRef();
  
    const API_KEY = 'AIzaSyCSC323lBf-iOZtk_F6x27oZXD-lx9PGQA';
  
    const handleUserInput = async () => {
      if (!userInput.trim()) return;
  
      const updatedChat = [
        ...chat,
        {
          role: 'user',
          parts: [{ text: userInput }],
        },
      ];
  
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            contents: updatedChat,
          }
        );
  
        const modelResponse =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
        if (modelResponse) {
          const updatedChatWithModel = [
            ...updatedChat,
            {
              role: 'model',
              parts: [{ text: modelResponse }],
            },
          ];
          setChat(updatedChatWithModel);
          setUserInput('');
        }
      } catch (error) {
        console.error('Gemini API Error:', error);
        setError(
          error.response?.data?.error?.message || 'An error occurred. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };
  
    const handleSpeech = async (text) => {
      setShouldAutoScroll(false);
      if (isSpeaking) {
        stop();
        setIsSpeaking(false);
      } else {
        if (!(await isSpeakingAsync())) {
          speak(text);
          setIsSpeaking(true);
        }
      }
      setTimeout(() => setShouldAutoScroll(true), 300);
    };
  
    const clearChat = () => {
      setShouldAutoScroll(false);
      setChat([]);
      setUserInput('');
      setError(null);
      Keyboard.dismiss();
      setTimeout(() => setShouldAutoScroll(true), 300);
    };
  
    const renderChatItem = ({ item }) => (
      <ChatBubble
        role={item.role}
        text={item.parts[0].text}
        onSpeech={() => handleSpeech(item.parts[0].text)}
        selectedChatFaceData={botData} 
        
      />
    );
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.header}>
        <Text style={[styles.title, { color: botData?.primary || '#000' }]}>{botData?.name || 'Gemini Chatbot'}</Text>
          <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={30} color={botData?.primary || '#000'} />
          </TouchableOpacity>
        </View>
  
        <FlatList
          ref={flatListRef}
          data={chat}
          renderItem={renderChatItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => {
            if (shouldAutoScroll) {
              flatListRef.current?.scrollToEnd({ animated: true });
            }
          }}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={true}
        />
  
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input,{borderColor: primaryColor }]}
            placeholder="Ask Anything..."
            placeholderTextColor="#aaa"
            value={userInput}
            fontSize={18}
            onChangeText={setUserInput}
            onSubmitEditing={handleUserInput}
            returnKeyType="send"
          />
          <TouchableOpacity style={[styles.sendButton,{backgroundColor: primaryColor }]} onPress={handleUserInput}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
  
        {loading && <ActivityIndicator style={styles.loading} size="large" color="#007AFF" />}
        {error && <Text style={styles.error}>{error}</Text>}
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      
    },
    clearButton: {
      padding: 5,
    },
    chatContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      paddingBottom: 10,
      
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: Platform.OS === 'ios' ? 20 : 20,
    },
    input: {
      flex: 1,
      height: 50,
      marginRight: 10,
      paddingHorizontal:20,
     
      backgroundColor: '#fff',
      borderRadius: 25,
      borderWidth: 1,
      
    },
    sendButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      
      alignItems: 'center',
      justifyContent: 'center',
    },
    loading: {
      marginTop: 10,
    },
    error: {
      color: 'red',
      marginTop: 10,
      textAlign: 'center',
    },
  });
  
 
  