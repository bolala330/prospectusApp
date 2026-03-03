import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CoursesProvider } from './src/context/CoursesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CoursesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CoursesProvider>
  );
}
