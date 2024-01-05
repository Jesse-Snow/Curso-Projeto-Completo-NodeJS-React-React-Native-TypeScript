import {Text, View, StatusBar  } from 'react-native';
import Routes from './src/routes/routes';

import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1d1d2e" barStyle='light-content' translucent={false}/>
      <Routes />
    </NavigationContainer>
  );
}