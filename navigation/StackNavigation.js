import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Intro } from '../screen/Intro';
import { Welcome } from '../screen/Welcome';
import { SignIn } from '../screen/SignIn';
import { SignUp } from '../screen/SignUp';
import{TabNavigation} from '../navigation/TabNavigation'
import { CreateCourse } from '../AddCourse/CreateCourse';
import { Home } from '../screen/Home';
import { NooCourse } from '../Components/Home/NooCourse';
import { Vieww } from '../screen/Vieww';
import { CourseList } from '../Components/Home/CourseList';
import { Lesson } from '../Components/Coursee/Lesson';
import { PracticeHomeQuiz } from '../Practice/PracticeHome';
import { PracticeHomeFlashcards } from '../Practice/PracticeHomeOne';
import { PracticeHomeQuestions } from '../Practice/PracticeHomeTwo';
import { Quizz } from '../Practice/Quizz';
import { QuizzSummary } from '../Practice/QuizzSummary';
import { FlashCard } from '../Practice/FlashCard';
import { Question } from '../Practice/Question';
import { Progress } from '../screen/Progress';
import { Explore } from '../screen/Explore';
import { SubscriptionScreen } from '../screen/SubscriptionScreen';
import { PaymentScreen } from '../screen/PaymentScreen';
import { SuccessScreen } from '../screen/SuccessScreen';
import { Chat } from '../screen/Chat';
import { ChatBot } from '../screen/ChatBot';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    
    
    <NavigationContainer>
    <Stack.Navigator  initialRouteName='Intro'>
    <Stack.Screen name="Intro" component={Intro}  options={{headerShown: false}} />
    <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown: false}} />
    <Stack.Screen name="SignIn" component={SignIn}  options={{headerShown: false}} />
    <Stack.Screen name="SignUp" component={SignUp}  options={{headerShown: false}} />
    <Stack.Screen name="TabNavigation" component={TabNavigation}  options={{headerShown: false}} />
    <Stack.Screen name="CreateCourse" component={CreateCourse}  options={{headerShown: false}} />
    <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
    <Stack.Screen name="NooCourse " component={NooCourse}  options={{headerShown: false}} />
    <Stack.Screen name="Vieww" component={Vieww}  options={{headerShown: false}} />
    <Stack.Screen name="CourseList" component={CourseList}  options={{headerShown: false}} />
    <Stack.Screen name="Lesson" component={Lesson}  options={{headerShown: false}} />
    <Stack.Screen name="PracticeHomeQuiz" component={PracticeHomeQuiz}  options={{headerShown: false}} />
    <Stack.Screen name="PracticeHomeFlashcards" component={PracticeHomeFlashcards}  options={{headerShown: false}} />
    <Stack.Screen name="PracticeHomeQuestions" component={PracticeHomeQuestions}  options={{headerShown: false}} />
    <Stack.Screen name="Quizz" component={Quizz}  options={{headerShown: false}} />
    <Stack.Screen name="QuizzSummary" component={QuizzSummary}  options={{headerShown: false}} />
    <Stack.Screen name="FlashCard" component={FlashCard}  options={{headerShown: false}} />
    <Stack.Screen name="Question" component={Question}  options={{headerShown: false}} />
    <Stack.Screen name="Progress" component={Progress}  options={{headerShown: false}} />
    <Stack.Screen name="Explore" component={Explore}  options={{headerShown: false}} />
    <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen}  options={{headerShown: false}} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen}  options={{headerShown: false}} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen}  options={{headerShown: false}} />
    <Stack.Screen name="Chat" component={Chat}  options={{headerShown: false}} />
    <Stack.Screen name="ChatBot" component={ChatBot}  options={{headerShown: false}} />
    



    </Stack.Navigator>
  
  </NavigationContainer>
  
  
  )
}

export default StackNavigation





