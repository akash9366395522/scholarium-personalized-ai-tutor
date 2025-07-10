import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Question = () => {
  const route = useRoute();
  const { courseParams } = route.params;
  const course = JSON.parse(courseParams);
  const qalist = course?.qa;

  const [selectedQuestion, setSelectedQuestion] = useState();
  const OnQuestionSelect = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginBottom: 50 }}>
      <Image
        source={require('./../assets/wave1.png')}
        style={{ width: '100%', height: 800, position: 'absolute' }}
      />
      <FlatList
        data={qalist}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View style={{ marginTop: 30 }}>
            <View style={styles.headerRow}>
              <Pressable onPress={() => navigation.goBack()} style={styles.backArrow}>
                <Ionicons name="arrow-back" size={40} color="white" />
              </Pressable>
              <Text style={styles.headerText}>Question & Answers</Text>
            </View>
            <Text style={styles.subHeader}>{course?.courseTitle ?? ''}</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable style={styles.card} onPress={() => OnQuestionSelect(index)}>
            <Text style={styles.question}>{item?.question}</Text>
            {selectedQuestion === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>Answer: {item?.answer}</Text>
              </View>
            )}
          </Pressable>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 15,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    marginTop: 5,
    marginLeft: -10, // keep it slightly spaced from the screen edge
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 40, // spacing between arrow and text
  },
  subHeader: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  answerContainer: {
    borderTopWidth: 0.4,
    marginVertical: 10,
    borderColor: 'grey',
  },
  answer: {
    fontSize: 15,
    color: 'green',
    marginTop: 10,
  },
});
