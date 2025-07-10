// navigation/TabNavigation.js
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screen/Home';
import { Explore } from '../screen/Explore';
import { Progress } from '../screen/Progress';
import { Chat } from '../screen/Chat';
import { Profile } from '../screen/Profile';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    

<View style={{ flex: 1, marginBottom: 20 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 70,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
          tabBarButton: (props) => (
            <TouchableWithoutFeedback {...props}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          ),
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize = 30;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Explore':
              iconName = 'compass';
              iconSize = 32; // adjusted for better visual balance
              break;
            case 'Progress':
              iconName = 'bar-chart';
              break;
            case 'Chat':
              iconName = 'chatbubble';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'ellipse';
          }

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: '#001740',
                  padding: 8,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                  height: 50,
                  marginTop: 25, // keeps it vertically centered
                }}
              >
                <Ionicons name={iconName} size={iconSize} color="#fff" />
              </View>
            );
          } else {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  marginTop: 25,
                }}
              >
                <Ionicons name={iconName} size={iconSize} color="#D3D3D3" />
              </View>
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  </View>
  );
};
