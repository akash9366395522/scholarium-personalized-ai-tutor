import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'
import { getDoc } from 'firebase/firestore';
;

export const Lesson = () => {
  const route = useRoute();
  const { chapterParams, docId, chapterIndex } = route.params;
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const GetProgress = (currentPage) => {
    const perc = currentPage / chapters?.content?.length;
    return perc;
  };

  const onChapterComplete = async () => {
    setLoader(true);
    try {
      const courseRef = doc(db, 'Courses', docId);
      const courseSnap = await getDoc(courseRef);
      const courseData = courseSnap.data();
  
      // Ensure completedChapter is initialized
      if (!courseData.completedChapter) {
        await updateDoc(courseRef, { completedChapter: [] });
      }
  
      // Now update with the new completed chapter
      await updateDoc(courseRef, {
        completedChapter: arrayUnion(chapterIndex),
      });
  
      navigation.goBack();
    } catch (error) {
      console.log('Error updating document: ', error);
    } finally {
      setLoader(false);
    }
  };
  
  
  

  return (
    <View style={{ padding: 25, paddingTop: 40, flex: 1, backgroundColor: 'white' }}>
      <Progress.Bar
        progress={GetProgress(currentPage)}
        width={Dimensions.get('screen').width * 0.85}
        color="#00103D"
      />

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text style={{ fontSize: 15, marginTop: 7 }}>
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <Text style={styles.codeExampletext1}>{chapters?.content[currentPage]?.code}</Text>
        )}

        {chapters?.content[currentPage]?.example && (
          <Text style={styles.codeExampletext}>{chapters?.content[currentPage]?.example}</Text>
        )}
      </View>

      <View style={{ position: 'absolute', bottom: 40, width: '100%', left: 25 }}>
        {chapters?.content?.length - 1 !== currentPage ? (
          <TouchableOpacity style={styles.button1} onPress={() => setCurrentPage(currentPage + 1)}>
            <Text style={styles.buttonText1}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button1} onPress={()=>onChapterComplete()} disabled={loader}>
            {loader ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText1}>Finish</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeExampletext: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 13,
    color: '#00103D',
    backgroundColor: '#e8f9ff',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    
  },
  codeExampletext1: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 13,
    color: '#fff',
    backgroundColor: '#111',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 10,
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
});
