import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import {GenerateTopicsAIModel} from '../confi/AiModel'
import { GenerateCourseAIModel } from '../confi/AiModel';
import Prompt from '../constant/Prompt';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useContext } from 'react';
import { UserDetailContext } from '../context/UserDetailContext';
import { useNavigation } from '@react-navigation/native';
export const CreateCourse= () => {


  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigation = useNavigation();
  const onGenerateTopic = async () => {
    try {
      const PROMPT = userInput + Prompt.IDEA;
      const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
  
      const textResponse =  aiResp.response.text(); // ✅ Fix here
      console.log("AI Raw Response:", textResponse);
  
      const match = textResponse.match(/{[\s\S]*}/);
      if (match) {
        const topicIdea = JSON.parse(match[0]);
        console.log("Parsed Topics:", topicIdea?.coursetitles);
        setTopics(
          topicIdea?.courseTitles ||
          topicIdea?.coursetitles ||
          topicIdea?.course_titles ||
          []
        );
      } else {
        console.error("No valid JSON found in response");
      }
    } catch (err) {
      console.error("Error generating topics:", err);
    }
  };
  
  const onTopicSelect = (topic) => {
    const isAlreadyExist= selectedTopics.find((item) => item == topic);
    if (!isAlreadyExist) {
      setSelectedTopics(prev=>[...prev,topic]);
    }
    else{
      const topics = selectedTopics.filter(item => item !== topic);
      setSelectedTopics(topics);
    }
  };


const isTopicSelected = (topic) => {
  const selection=selectedTopics.find(item => item == topic);
return selection?true:false;
}


const onGenerateCourse = async () => {
  const PROMPT = selectedTopics + Prompt.COURSE;

  try {
    const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
    const textResponse = await aiResp.response.text();  // ✅ Fix: await and ()
    console.log("Raw AI Response:", textResponse);

    const jsonMatch = textResponse.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      console.error("No valid JSON found in AI response");
      return;
    }

    // ✅ Remove trailing commas that break JSON parsing
    const cleanJsonText = jsonMatch[0]
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');

    try {
      const resp = JSON.parse(cleanJsonText);
      const courses = resp.courses;
      console.log("Generated Courses:", courses);

      if (!courses || courses.length === 0) {
        console.error("No courses found in AI response");
        return;
      }

      for (const course of courses) {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'Courses', docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email ?? '',
          docId: docId,
        });
      }

      navigation.navigate('TabNavigation');
    } catch (parseErr) {
      console.error("JSON parsing failed:", parseErr.message);
    }
  } catch (e) {
    console.error("Error generating courses:", e.message);
  }
};





  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Course</Text>

      <Text style={styles.question}>What do you want to learn today?</Text>

      <Text style={styles.description}>
        Write what course you want to create (Ex. Learn Next Js, Financial Accounting, 12ᵗʰ Physics Chapter)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Type here....."
        placeholderTextColor="#000"
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />

      <TouchableOpacity style={styles.button}
      onPress={() =>onGenerateTopic()}>
        <Text style={styles.buttonText}>Generate Topic</Text>
      </TouchableOpacity>
<View>
      <Text style={styles.bottomText}>
        Select all the topics which you want to include in your course
      </Text>
      <View style={styles.topicContainer}>
      {topics.map((item, index) => (
  <Pressable key={index} onPress={() => onTopicSelect(item)}>
    <Text style={[
    styles.topicText,
    {
      backgroundColor: isTopicSelected(item) ? '#00103D' : '#fff',
      color: isTopicSelected(item) ? '#fff' : '#00103D',
    },
  ]}>{item}</Text>
  </Pressable>
))}
      </View>
</View>
{selectedTopics.length > 0 && <TouchableOpacity style={styles.button1}
onPress={() =>onGenerateCourse()}>
        <Text style={styles.buttonText1}>Generate Course</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00103D',
    marginBottom: 20,
    marginTop: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
    lineHeight: 22,
  },
  input: {
    borderColor: '#00103D',
    borderWidth: 1,
    borderRadius: 14,
    height: 120,
    padding: 14,
    fontSize: 16,
    marginBottom: 23,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00103D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  button1: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#00103D',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },

  buttonText1: {
    fontSize: 20,
    color: '#00103D',
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 16,
    color: '#000',
  },
 
  topicText: {
    padding: 7,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: '#00103D',
    fontSize: 10,
    
  }, 
  topicContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop:15,
  },
});
