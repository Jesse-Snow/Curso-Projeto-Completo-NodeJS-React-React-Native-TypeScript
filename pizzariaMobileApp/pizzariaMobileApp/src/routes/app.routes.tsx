import { View, Text } from 'react-native';

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

import { createStackNavigator } from '@react-navigation/stack';

export type StackParamList = {
    Dashboard: undefined;
    Order: {
        orderNumber: string | number,
        order_id: string
    };
}

const Stack = createStackNavigator<StackParamList>();


function AppRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown:false}}/>
            <Stack.Screen name='Order' component={Order} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AppRoutes;