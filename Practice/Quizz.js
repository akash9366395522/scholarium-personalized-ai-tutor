import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';

import { db } from '../firebaseConfig';
export const Quizz = () => {
    const route = useRoute();
    const { courseParams } = route.params; // params coming from navigation
    const course = JSON.parse(courseParams);
    const quiz=course.quiz; // you sent it as JSON string
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption,setSelectedOption]=useState();
  const[result,setResult]=useState([]);
  const[loading,setLoading]=useState(false);
  const navigation = useNavigation();
  const GetProgress = (currentPage) => {
    const perc = (currentPage / quiz?.length);
    return perc;
  }
const OnOptionSelect=(selectedChoice)=>{
setResult(prev=>({
...prev,
[currentPage]:{
  userChoice:selectedChoice,
  isCorrect:quiz[currentPage]?.correctAns===selectedChoice,
  question:quiz[currentPage]?.question,
  correctAns:quiz[currentPage]?.correctAns,
}


}));
}

const onQuizFinish=async()=>{
  setLoading(true);
  try{
  //save theresult in database for quiz
await updateDoc(doc(db,'Courses',course?.docId),{quizResult:result})
setLoading(false);

navigation.navigate('QuizzSummary', {
  quizResultParam: JSON.stringify(result), // you are converting it to a string here
});

  }
  catch(e){
setLoading(false);
  }
  //redirect user to quiz summary

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
                            <Text style={{fontSize:22,color:'white', fontWeight:'bold'}}>{currentPage+1} of {quiz?.length} questions</Text>
            
        </View>
        <View
        style={{marginTop:10}}>
<Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('window').width * 0.85} color = 'white' height={5}/>
        </View>
        <View style={{padding:25, backgroundColor:'white', marginTop:30, height:Dimensions.get('window').height * 0.75, elevation:5, borderRadius:20}}>

<Text
style={{fontSize:24, fontWeight:'bold', textAlign:'center', marginBottom:20}}

>{quiz[currentPage].question}</Text>
{quiz[currentPage].options.map((item, index) => (
    
    
    <TouchableOpacity
    onPress={()=>{setSelectedOption(index);
      OnOptionSelect(item);
    }}
     key={index} 
    style={{
        padding:15,
        borderWidth:1,
        backgroundColor:selectedOption==index?'#dbffdd':null,
        borderRadius:15,
        marginVertical:10,
        borderColor:selectedOption==index?'green':null
    }}>
        <Text style={{fontSize:17, }}
        >{item}</Text>
    </TouchableOpacity>
    
))}
        </View>
        {(selectedOption?.toString()&&quiz.length-1>currentPage)&&
        <TouchableOpacity style={styles.button}
        onPress={()=>{setCurrentPage(currentPage+1);setSelectedOption(null)}}
        
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>}

        {(selectedOption?.toString()&&quiz.length-1==currentPage)   &&   <TouchableOpacity style={styles.button} onPress={onQuizFinish} disabled={loading}>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Finish</Text>
  )}
</TouchableOpacity>}


      </View>
    </View>
  )
};


const styles = StyleSheet.create({


    button: {
        backgroundColor: '#00103D',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 20,
        
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
      },

})