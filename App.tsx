import React from 'react';
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { Dashboard } from './src/pages/Dashboard/Dashboard'
import { Register } from './src/pages/Register'

export default function App() {  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  // mostra uma tela de Splash enquanto carrega as fontes
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="default" 
      />

      <Register />
    </ThemeProvider>
  );
}
