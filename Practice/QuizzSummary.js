import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';

export const QuizzSummary = () => {
  const route = useRoute();
  const { quizResultParam } = route.params;
  const quizResult = JSON.parse(quizResultParam);
  const navigation = useNavigation();
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    quizResult && CalculateResult();
  }, [quizResult]);

  const CalculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)
        ?.filter(([key, value]) => value?.isCorrect === true);
      const totalQues_ = Object.keys(quizResult).length;
      setCorrectAns(correctAns_.length);
      setTotalQuestion(totalQues_);
    }
  };

  const GetPercMark = () => {
    return ((correctAns / totalQuestion) * 100).toFixed(0);
  };

  const summaryData = Object.entries(quizResult);

  return (
    <FlatList
      data={summaryData}
      keyExtractor={([key]) => key}
      ListHeaderComponent={
        <View>
          <Image
            source={require('./../assets/wave1.png')}
            style={{ width: '100%', height: 200 }}
             resizeMode="cover"
          />
          <View style={{ width: '100%', padding: 35 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              Quiz Summary
            </Text>

            <View style={styles.summaryBox}>
              <Image
                source={require('./../assets/trophy.png')}
                style={styles.trophy}
              />
              <Text style={styles.resultHeading}>
                {GetPercMark() > 60 ? 'Congratulations!' : 'Try Again!'}
              </Text>
              <Text style={styles.resultSubheading}>
                You gave {GetPercMark()}% Correct Answer
              </Text>

              <View style={styles.resultRow}>
                <View style={styles.resulttextcontainer}>
                  <Text style={styles.resulttext}>Q {totalQuestion}</Text>
                </View>
                <View style={styles.resulttextcontainer}>
                  <Text style={styles.resulttext}>✅ {correctAns}</Text>
                </View>
                <View style={styles.resulttextcontainer}>
                  <Text style={styles.resulttext}>❌ {totalQuestion - correctAns}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TabNavigation')}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.summaryTitle}>Summary :</Text>
          </View>
        </View>
      }
      renderItem={({ item }) => {
        const quizItem = item[1];
        return (
            <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              margin: 10,
              borderRadius: 15,
              backgroundColor: quizItem?.isCorrect ? '#dbffdd' : '#FFAAAA',
              borderColor: quizItem?.isCorrect ? 'green' : 'red',
            }}
          >
            <Text style={{ fontSize: 20 }}>{quizItem.question}</Text>
            <Text style={{ fontSize: 15 }}>Ans: {quizItem?.correctAns}</Text>
          </View>
          </View>
        );
      }}
      ListFooterComponent={<View style={{ height: 50 }} />}
    />
   
  );
};

const styles = StyleSheet.create({
  summaryBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginTop: 60,
    display: 'flex',
    alignItems: 'center',
  },
  trophy: {
    width: 100,
    height: 100,
    marginTop: -60,
  },
  resultHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  resultSubheading: {
    fontSize: 17,
    color: 'grey',
  },
  resultRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  resulttextcontainer: {
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  resulttext: {
    fontSize: 20,
  },
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
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: -20,
  },
});
