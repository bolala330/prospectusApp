import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FacultiesScreen from '../screens/FacultiesScreen';
import CoursesScreen from '../screens/CoursesScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import QuizScreen from '../screens/QuizScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FacultiesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Faculties" component={FacultiesScreen} options={{ title: 'Faculties' }} />
    <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'Courses' }} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course Details' }} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Faculties') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Quiz') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Faculties" component={FacultiesStack} options={{ headerShown: false }} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
    </Tab.Navigator>
  );
}
