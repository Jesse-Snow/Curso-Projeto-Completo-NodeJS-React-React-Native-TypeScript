import { View,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../pages/SignIn';

const Stack = createStackNavigator();

function AuthRoutes(){
    return (
      <Stack.Navigator>
        <Stack.Screen name='SignIn' component={SignIn}/>
      </Stack.Navigator>
    )
}

export default AuthRoutes;