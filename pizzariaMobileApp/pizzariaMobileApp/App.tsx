import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, Alert } from 'react-native';

export default function App() {

  function handleButton(){
    Alert.alert('Button pressed again...!');
  }

  return (
    <View style={styles.container}>
      <Text>Pizzaria Mobile App</Text>
      <Button onPress={handleButton} title='Button'/> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
