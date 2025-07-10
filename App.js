import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import StackNavigation from '../scholarium/navigation/StackNavigation';
import { UserDetailContext } from './context/UserDetailContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [userDetail, setUserDetail] = useState();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar hidden={true} />
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <StackNavigation />
        </UserDetailContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
