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
<<<<<<< HEAD
}
=======
}
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
