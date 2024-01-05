import { View, Text } from 'react-native';

import Dashboard from '../pages/Dashboard';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;